import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignIn from "./pages/Signin/SignIn";
import Dashboard from "./pages/dashboard/Dashboard";
import CreateNote from "./pages/create-note/CreateNote";
import Analytics from "./pages/Analytics/Analytics";
import AllNotes from "./pages/all-notes/AllNotes";
import SingleNote from "./pages/Single-Note/SingleNote";
import Bookmarks from "./pages/Bookmarks/Bookmarks";


export const router = createBrowserRouter([
    {
        element: <Home></Home>,
        path: '/'
    },
    {
        element: <Login></Login>,
        path: "/login"
    },
    {
        element: <SignIn></SignIn>,
        path: '/signin'
    },
    {
        element: <Dashboard></Dashboard>,
        path: '/dashboard',
        children: [

            {
                element: <CreateNote></CreateNote>,
                path: '/dashboard/create-note'
            }, {
                element: <AllNotes></AllNotes>,
                path: '/dashboard',
                index: true

            },
            {
                element: <SingleNote></SingleNote>,
                path: '/dashboard/notes/:id'
            }, {
                element: <Bookmarks></Bookmarks>,
                path: '/dashboard/bookmarks'
            }
        ]


    }

])