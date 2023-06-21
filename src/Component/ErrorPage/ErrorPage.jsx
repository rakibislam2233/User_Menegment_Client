import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="w-full h-screen flex justify-center items-center">
           <div>
           <h2 className="text-5xl font-semibold text-rose-700">404 Page Not Found</h2>
           <div className="flex justify-center">
           <Link to={'/'}><button className="py-2 my-3 mx-auto rounded-xl px-3 bg-gradient-to-r from-blue-500 to-cyan-500 font-semibold">Back To Home</button></Link>
           </div>
           </div>
        </div>
    );
};

export default ErrorPage;