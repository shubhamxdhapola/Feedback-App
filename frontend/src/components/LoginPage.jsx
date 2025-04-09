import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiClient } from "../lib/apiClient";
import { LOGIN_ROUTE } from "../lib/constants";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/authSlice";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const LoginPage = () => {
  const initialFormData = {
    username: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username.trim()) return toast.error("Username is required!");
    if (!formData.password.trim()) return toast.error("Password is required!");
    try {
      setSubmitting(true)
      const response = await apiClient.post(LOGIN_ROUTE, formData);
      if (response.status === 200) {
        dispatch(login({ username: response.data.username }));
        setFormData(initialFormData);
        toast.success("Logged in successfully");
        setSubmitting(false);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
      setSubmitting(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset w-sm bg-base-200 border border-base-300 p-4 rounded-box">
          <legend className="fieldset-legend">Login</legend>

          <label className="fieldset-label">Username</label>
          <input
            type="text"
            value={formData.username}
            name="username"
            className="input text-sm w-full"
            placeholder="Enter username"
            onChange={handleOnChange}
          />

          <label className="fieldset-label">Password</label>
          <input
            type="password"
            value={formData.password}
            name="password"
            className="input text-sm w-full"
            placeholder="Enter password"
            onChange={handleOnChange}
          />

          <button className="btn btn-primary mt-4" disabled={submitting}>
            {submitting ? <Loader2 className="animate-spin" /> : "Login"}
          </button>
          <p className="mt-3 text-center">
            Don't have an account?&nbsp;
            <Link
              to="/register"
              className="underline text-blue-400 hover:text-blue-500 duration-300"
            >
              Register
            </Link>
          </p>
        </fieldset>
      </form>
    </div>
  );
};

export default LoginPage;
