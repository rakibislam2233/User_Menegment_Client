import axios from "axios";
import { useForm } from "react-hook-form";
import {BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'

const AddUser = () => {
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
        const {name,email,phone} = data;
        const userInfo = {name,email,phone,imageUrl}
        axios.post(`https://user-menegment-server-side.vercel.app/addUser`, userInfo)
        .then(res=>{
            if(res.data.insertedId){
                reset()
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Create a new user successfully',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })
      })
  };
  return (
    <div className="w-full max-w-3xl mt-10 mx-auto">
      <div className="space-y-2">
        <h2 className="text-center py-3 px-5  bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl font-semibold text-white">
          Add New User
        </h2>
        <div>
          <Link to={"/"}>
            <button className="flex gap-1 items-center py-1  px-4 border rounded-full  bg-gradient-to-r from-blue-500 to-cyan-500 font-semibold text-white">
            <BsArrowLeft className="w-5 h-5"></BsArrowLeft> All user
            </button>
          </Link>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-2 bg-slate-100 p-5 rounded-2xl">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter Your Name"
                {...register("name", { required: true })}
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
              />
              {errors.name && (
                <span className="text-rose-500">Please enter your name</span>
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
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
              />
              {errors.email && (
                <span className="text-rose-500">Please enter your email</span>
              )}
            </div>
            <div>
              <label htmlFor="phone" className="block mb-2 text-sm">
                Phone Number
              </label>
              <input
                type="number"
                placeholder="+880********"
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
              <input type="file" {...register("image",{ required: true })} />
              <br />
              {errors.image && (
                <span className="text-rose-500">Please enter Choose your photo</span>
              )}
            </div>
          </div>
          <div className="py-2">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-cyan-500 w-full rounded-xl font-semibold py-2 text-white"
            >
              Create New User 
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
