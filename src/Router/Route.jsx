import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../Component/Home/Home";
import AddUser from "../Component/AddUser/AddUser";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'/addUser',
            element:<AddUser></AddUser>
        }
      ]
    },
  ]);

export default router;