import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { BsEye, BsPencilSquare, BsPlus, BsTrashFill } from "react-icons/bs";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
const Home = () => {
  const [singleUser, setsingleUser] = useState([]);
  const [userInfo, setuserInfo] = useState([]);
  const { data: users = [], refetch } = useQuery("UserData", () =>
    axios.get(`http://localhost:5000/getUser`).then((res) => {
      return res.data;
    })
  );
  const ViewUser = (user) => {
    setsingleUser(user);
  };
  const updateInfo = (user) => {
    setuserInfo(user);
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);

    const url = `https://api.imgbb.com/1/upload?key=9d44eaf618447b8f95c8ff98785d99c3`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        const imageUrl = imageData.data.display_url;
        const { name, email, phone } = data;
        const userInfo = { name, email, phone, imageUrl };
        axios
          .patch(`http://localhost:5000/updateUser/${email}`, userInfo)
          .then((res) => {
            console.log(res.data);
            refetch();
            if (res.data.modifiedCount) {
              reset();
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Create a new user successfully",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
      });
  };
  const deleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be deleted this user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/deleteUser/${id}`).then((res) => {
          refetch();
          if (res.data.deletedCount > 0) {
            Swal.fire(
                'Deleted!',
                'User  deleted successfully',
                'success'
              )
          }
        });
      }
    });
  };
  return (
    <div className="w-full max-w-3xl mt-10 mx-auto">
      <div className="space-y-3">
        <div>
          <h1 className=" text-center p-3 bg-gradient-to-r from-blue-500 to-cyan-500 font-semibold text-white rounded-xl">
            User Management System
          </h1>
        </div>
        <div>
          <Link to={"/addUser"}>
            <button className="flex gap-1 items-center py-2  px-4 border rounded-full  bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold">
              <BsPlus className="w-5 h-5"></BsPlus> Add user
            </button>
          </Link>
        </div>
        <div>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>View</th>
                  <th>Edit</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <>
                    <tr>
                      <td>
                        <img
                          className="w-12  h-12 rounded-xl"
                          src={user.imageUrl}
                          alt=""
                        />
                      </td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>
                        <button
                          onClick={() => [
                            window.my_modal_3.showModal(),
                            ViewUser(user),
                          ]}
                          className="w-10 h-10 flex justify-center items-center bg-gradient-to-r from-blue-500 to-cyan-500 rounded text-white"
                        >
                          <BsEye className="w-5 h-5"></BsEye>
                        </button>
                      </td>
                      <td>
                        <label
                          onClick={() => updateInfo(user)}
                          htmlFor="my_modal_6"
                          className="w-10 h-10 flex justify-center items-center bg-gradient-to-r from-blue-500 to-cyan-500 rounded text-white cursor-pointer"
                        >
                          <BsPencilSquare className="w-5 h-5"></BsPencilSquare>
                        </label>
                      </td>
                      <td>
                        <button
                          onClick={() => deleteUser(user._id)}
                          className="w-10 h-10 flex justify-center items-center bg-rose-600 rounded text-white"
                        >
                          <BsTrashFill className="w-5 h-5"></BsTrashFill>
                        </button>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <dialog id="my_modal_3" className="modal">
          <form method="dialog" className="modal-box">
            <button className="w-8 h-8 bg-slate-200 rounded-full absolute right-2 top-2">
              ✕
            </button>
            <div className="text-center space-y-4 font-semibold">
              <img
                className="w-28 h-28 mx-auto rounded-full"
                src={singleUser.imageUrl}
                alt=""
              />
              <h2>Name : {singleUser.name}</h2>
              <h2>Email : {singleUser.email}</h2>
              <h2>Phone Number : {singleUser.phone}</h2>
            </div>
          </form>
        </dialog>
        <input type="checkbox" id="my_modal_6" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full space-y-2 bg-slate-100 p-5 rounded-2xl"
            >
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Your Name"
                    defaultValue={userInfo.name}
                    {...register("name", { required: true })}
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                  />
                  {errors.name && (
                    <span className="text-rose-500">
                      Please enter your name
                    </span>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm">
                    Email
                  </label>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    placeholder="Enter Your Email"
                    defaultValue={userInfo.email}
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                  />
                  {errors.email && (
                    <span className="text-rose-500">
                      Please enter your email
                    </span>
                  )}
                </div>
                <div>
                  <label htmlFor="phone" className="block mb-2 text-sm">
                    Phone Number
                  </label>
                  <input
                    type="number"
                    placeholder="+880********"
                    defaultValue={userInfo.phone}
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                    {...register("phone", {
                      required: true,
                      minLength: 0,
                      maxLength: 11,
                    })}
                  />
                  {errors.phone?.type === "required" && (
                    <span className="text-rose-500">
                      Please enter your phone number
                    </span>
                  )}
                </div>
                <div>
                  <label htmlFor="image" className="block mb-2 text-sm">
                    Photo URL:
                  </label>
                  <input
                    type="file"
                    {...register("image", { required: true })}
                  />
                  <br />
                  {errors.image && (
                    <span className="text-rose-500">
                      Please enter Choose your photo
                    </span>
                  )}
                </div>
              </div>
              <div className="py-2">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 w-full rounded-xl font-semibold py-2 text-white"
                >
                  Update User Information
                </button>
              </div>
            </form>
            <div className="modal-action">
              <label htmlFor="my_modal_6" className="btn">
                Close!
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
