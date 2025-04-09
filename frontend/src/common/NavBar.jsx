import React from "react";
import { IoMdLogIn } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { LuUserRoundCheck } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { apiClient } from "../lib/apiClient";
import { LOGOUT_ROUTE } from "../lib/constants";
import { logout } from "../store/slices/authSlice";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

const NavBar = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  const isLoginOrRegisterPage =
    location.pathname === "/login" || location.pathname === "/register";

  const handleLogout = async () => {
    try {
      const response = await apiClient.post(LOGOUT_ROUTE);
      if (response.status === 200) {
        dispatch(logout());
        toast.success("Logged out successfully!");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="text-center sticky top-0 z-100" data-aos="fade-down">
      <ul className="menu menu-horizontal bg-base-200 rounded-box mt-6">
        <li>
          <Link to="/" className="tooltip" data-tip="Home">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Home
          </Link>
        </li>
        {!isAuthenticated && !isLoginOrRegisterPage && (
          <>
            <li>
              <Link to="/login" className="tooltip" data-tip="Login">
                <IoMdLogIn className="size-5" />
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="tooltip" data-tip="Register">
                <LuUserRoundCheck className="size-5" />
                Register
              </Link>
            </li>
          </>
        )}

        {isAuthenticated && (
          <li>
            <a className="tooltip" data-tip="Logout" onClick={handleLogout}>
              <IoIosLogOut className="size-5" />
              Logout
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};

export default NavBar;
