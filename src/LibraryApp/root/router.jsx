import {createBrowserRouter} from "react-router-dom";
import LoginPage from "../pages/LoginPage.jsx";
import SignupPage from "../pages/SignupPage.jsx";
import BorrowPage from "../pages/BorrowPage.jsx";
import AdminDashboard from "../pages/AdminDashboard.jsx";
import AddBookPage from "../pages/AddBookPage.jsx";
import LiberianDashboard from "../pages/LiberianDashboard.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";
import HomePage from "../pages/HomePage.jsx";


const BrowseRouter = createBrowserRouter([
    {
        path: '/',
        element:<HomePage/>
    },
    {
        path:'/login',
        element:<LoginPage/>
    },
    {
        path:'/signup',
        element:<SignupPage/>
    },
    {
        path:'/borrow/:book_id',
        element:<BorrowPage/>
    },
    {
        path:'/admin',
        element:<AdminDashboard/>
    },
    {
        path:'/admin/add_book',
        element:<AddBookPage/>
    },
    {
        path:'/liberian',
        element:<LiberianDashboard/>
    },
    {
        path:'/liberian/add_book',
        element:<AddBookPage/>
    },
    {
        path:'*',
        element:<NotFoundPage/>
    }
])