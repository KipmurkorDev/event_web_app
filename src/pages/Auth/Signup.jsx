import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
function Signup() {
  const baseUrl = import.meta.env.VITE_APP_API_URL;

  const [formData, setFormData] = useState({
    fullName: "",
    profession: "student",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${baseUrl}/users/signup`, formData);
      if (response.status === 200) {
        toast.success("Successfully Registered", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsSubmitting(false);
        navigate("/home");
      } else {
        console.error("Authentication failed");
        toast.error("User creation failed");
      }
    } catch (error) {
      console.log(error);

      if (error.response) {
        setIsSubmitting(false);
        if (error.response.status === 400) {
          toast.error("Some fields are missing");
        } else if (error.response.status === 409) {
          toast.error("User already registered");
        } else {
          toast.error(error.response.data.message);
        }
      } else {
        toast.error(error.response.data.message);
      }
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const label = "text-black text-xl font-medium";
  const input =
    "bg-zinc-800 rounded-[10px] w-full h-[2.7em] px-4 py-2 mt-2 text-black text-lg font-medium";

  return (
    <>
    <div className="flex items-center justify-center min-h-screen">
      <div className="font-['Montserrat'] p-4 md:ml-4 lg:ml-20 my-8">
        <h2 className="text-black font-medium text-2xl md:text-4xl py-3 md:py-6">
          Get Started
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col">
            <label htmlFor="fullName" className={label}>
              Full Name
            </label>
            <input
              type="text"
              placeholder="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={input}
              disabled={isSubmitting}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className={label}>
              Email
            </label>
            <input
              type="text"
              placeholder="name@example.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={input}
              disabled={isSubmitting}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className={label}>
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={input}
              disabled={isSubmitting}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="profession" className={label}>
              Profession
            </label>
            <select
              name="profession"
              value={formData.profession}
              onChange={handleChange}
              className={input}
              disabled={isSubmitting}
            >
              <option value="student">Student</option>
              <option value="professional">Professional</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="inline-flex my-4">
            <button
              type="submit"
              className="inline-flex items-center w-full h-[2.7em] rounded-[10px] border border-zinc-500 text-stone-500 font-medium px-5"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing Up..." : "Sign up to eventhive"}
              <span className="ml-2">
                <FaArrowRight />
              </span>
            </button>
          </div>
        </form>

        <p className="text-sm md:text-base">
          Already have an account? <Link to="/login">Login</Link> to your
          account
        </p>
      </div>
    </div>
    <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default Signup;
