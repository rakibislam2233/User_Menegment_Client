
import { BsEye, BsPencilSquare, BsTrashFill } from "react-icons/bs";

const TableData = ({user}) => {
    const {name,email,phone,imageUrl} = user;
  return (
    <>
      <tr>
        <td>
          <img className="w-12  h-12 rounded-xl" src={imageUrl} alt="" />
        </td>
        <td>{name}</td>
        <td>{email}</td>
        <td>{phone}</td>
        <td>
          <button
            onClick={() => window.my_modal_3.showModal()}
            className="w-10 h-10 flex justify-center items-center bg-gradient-to-r from-blue-500 to-cyan-500 rounded text-white"
          >
            <BsEye className="w-5 h-5"></BsEye>
          </button>
        </td>
        <td>
          <button className="w-10 h-10 flex justify-center items-center bg-gradient-to-r from-blue-500 to-cyan-500 rounded text-white">
            <BsPencilSquare className="w-5 h-5"></BsPencilSquare>
          </button>
        </td>
        <td>
          <button className="w-10 h-10 flex justify-center items-center bg-rose-600 rounded text-white">
            <BsTrashFill className="w-5 h-5"></BsTrashFill>
          </button>
        </td>
      </tr>
    </>
  );
};

export default TableData;
