import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiClient } from "../lib/apiClient";
import { REGISTER_ROUTE } from "../lib/constants";
import toast from "react-hot-toast";
import { register } from "../store/slices/authSlice";
import { useDispatch } from "react-redux";
import { Loader2 } from "lucide-react";

const RegisterPage = () => {
  const initialFormData = {
    username: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [submitting, setSubmitting] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    setSubmitting(true);
    try {
      const response = await apiClient.post(REGISTER_ROUTE, formData);
      if (response.status === 200) {
        dispatch(register({ username: response.data.username }));
        toast.success("Registered successfully!");
        setSubmitting(false);
        setFormData(initialFormData);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      setSubmitting(false);
      toast.error(err.response.data.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset w-sm bg-base-200 border border-base-300 p-4 rounded-box">
          <legend className="fieldset-legend">Register</legend>

          <label className="fieldset-label">Username</label>
          <input
            type="text"
            value={formData.username}
            name="username"
            className="input text-sm w-full"
            placeholder="Choose username"
            onChange={handleOnChange}
          />

          <label className="fieldset-label">Password</label>
          <input
            type="password"
            value={formData.password}
            name="password"
            className="input text-sm w-full"
            placeholder="Choose password"
            onChange={handleOnChange}
          />

          <button className="btn btn-primary mt-4" disabled={submitting}>
            {submitting ? <Loader2 className="animate-spin" /> : "Register"}
          </button>
          <p className="mt-3 text-center">
            Already have an account?&nbsp;
            <Link
              to="/login"
              className="underline text-blue-400 hover:text-blue-500 duration-300"
            >
              Login
            </Link>
          </p>
        </fieldset>
      </form>
    </div>
  );
};

export default RegisterPage;
