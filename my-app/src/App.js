import React, { createContext, useEffect, useState } from 'react';
import Login from "./pages/login/Login";
import Register from './pages/register/Register';
import HomePage from './pages/homePage/HomePage';
import ProfilePage from './pages/profilePage/ProfilePage';
import AddPost from './pages/addPost/AddPost';
import Navbar from './components/navbar/Navbar';
import { Navigate, Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Stories from './pages/stories/Stories';
import CreateStory from './pages/createStory/CreateStory';
import { useSelector } from 'react-redux';
import { io } from "socket.io-client";
import EditPost from './pages/editPost/EditPost';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Search from './pages/search/Search';
import Setting from './pages/setting/Setting';
export const updateProfileContext = createContext();
const App = () => {
  const [update, setUpdate] = useState('');
  const [socket, setSocket] = useState(null);
  const value = {
    update,
    setUpdate
  }
  const user = useSelector(state => state.user);
  const Layout = () => {
    return (
      <div className="w-full">
        <Navbar socket={socket}/>
        <Outlet/>
      </div>
    );
  };
  const StoryLayout = () => {
    return (
      <div className="w-full">
        <Outlet/>
      </div>
    );
  };
  const ProtectRouter = ({ children }) => {
    if (!user) {
      return <Navigate to="/login"/>
    }
    return children;
  }
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: (<ProtectRouter><updateProfileContext.Provider value={value}><Layout /></updateProfileContext.Provider></ProtectRouter>),
        children: [
          {
            path: "/",
            element: <HomePage socket={socket} />,
          },
          {
            path: "/profile/:id",
            element: <ProfilePage socket={socket} />,
          },
        ]
      },
      {
        path: "/stories",
        element: (<ProtectRouter><StoryLayout /></ProtectRouter>),
        children: [
          {
            path: "/stories/:userId",
            element: <Stories />,
          },
          {
            path: "/stories/create",
            element: <CreateStory />,
          },
        ]
      },
      {
        path: "/add-post/:id",
        element: <ProtectRouter><AddPost /></ProtectRouter>
      },
      {
        path: "/edit-post/:id",
        element: <ProtectRouter><EditPost /></ProtectRouter>
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/search",
        element: <ProtectRouter><Search /></ProtectRouter>,
      },
      {
        path: "/setting/:id",
        element: <ProtectRouter><Setting /></ProtectRouter>,
      },
    ]
  );
  useEffect(() => {
    setSocket(io("http://localhost:5000"));
  }, []);
  useEffect(() => {
    socket?.emit("newUser", user?.user);
  }, [socket, user]);
  return (
      <div className='w-full bg-slate-100 dark:bg-gray-900 relative'>
        <RouterProvider router={router}/>
      </div>
  );
}

export default App;
