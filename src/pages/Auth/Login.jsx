import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const access_token = import.meta.env.VITE_ACCESS_TOKEN;
const auth_token = import.meta.env.VITE_AUTH_TOKEN;

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("http://ec2-51-20-84-219.eu-north-1.compute.amazonaws.com/login", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + auth_token,
        },
      });

      if (response.status === 200) {
        console.log("Authentication successful");
        toast.success("Successfully loggeed in");
        navigate("/home");
      } else {
        console.error("Authentication failed");
        toast.error("User creation failed");
        navigate('/home')
      }
    } catch (error) {
      console.error("API request failed", error);
      toast.error("User creation failed");
    }

    setIsSubmitting(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const label = "text-black text-xl font-medium";
  const input = "bg-zinc-800 rounded-[10px] w-full h-[2.7em] px-4 py-2 mt-2 text-black text-lg font-medium";

  return (
    <>
    <div className="font-['Montserrat'] p-4 md:ml-4 lg:ml-20 my-8">
      <h2 className="text-black font-medium text-2xl md:text-4xl py-3 md:py-6">Welcome Back !!</h2>
      <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-3">
        <div className="flex flex-col">
          <label htmlFor="email" className={label}>Email</label>
          <input
            type="text"
            placeholder="name@example.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`${input} bg-zinc-800 w-1/3`}
            disabled={isSubmitting}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className={label}>Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`${input} bg-zinc-800 w-1/3`}
            disabled={isSubmitting}
          />
        </div>

        <div className="inline-flex my-4 items-center ">
          <button type="submit" className="inline-flex items-center justify-center w-1/3 h-[2.7em] rounded-[10px] border border-zinc-500 text-stone-500 font-medium px-5" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login to Eventhive"}
            <span className="ml-2">
              <FaArrowRight />
            </span>
          </button>
        </div>
      </form>

      <p className="text-sm md:text-base">
        Don't have an account? <Link to="/signup"><span className="active hover:text-red-500">Sign up</span></Link> to your account
      </p>
    </div>
    <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
