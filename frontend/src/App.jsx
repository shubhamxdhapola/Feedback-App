import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import ProductPage from "./components/ProductPage";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { apiClient } from "./lib/apiClient";
import { GET_USER_INFO } from "./lib/constants";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/slices/authSlice";
import NavBar from "./common/NavBar";
import AOS from 'aos';
import 'aos/dist/aos.css';

const App = () => {
  const [ loading, setLoading ] = useState(true);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    AOS.init({
      duration: 500, 
      once: true,     
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    async function getUserInfo() {
      try {
        const response = await apiClient.get(GET_USER_INFO);
        if (response.status === 200) {
          dispatch(checkAuth({ username: response.data.username }));
          setLoading(false);
        }
      } catch(err) {
        console.log(err)
        setLoading(false)
      } finally {
        setLoading(false)
      }
    }
    getUserInfo();
  },[]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <>
      <Toaster />
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/" />}
        />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </>
  );
};

export default App;
