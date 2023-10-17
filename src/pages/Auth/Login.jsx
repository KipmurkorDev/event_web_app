import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

export default function Login() {

    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
      });

      const [isSubmitting, setIsSubmitting] = useState(false);

      const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);


        try {
          const response = await fetch("auth-api-endpoint", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });

          if (response.status === 200) {
            console.log("Authentication successful");
            navigate("/home");
          } else {
            console.error("Authentication failed");
          }
        } catch (error) {
          console.error("API request failed", error);
        }

        setIsSubmitting(false);
      };

      const navigate = useNavigate();

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

      const label = "text-black text-xl font-medium";
      const input = "bg-zinc-800 rounded-[10px] w-full h-[2.7em] px-4 py-2 mt-2 text-black text-lg font-medium";

  return (
    <div className="font-['Montserrat'] ml-20 my-8">
      <h2 className="text-black font-medium text-4xl py-6">Welcome Back !!</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-1/3">

        <div className="flex flex-col">
          <label htmlFor="email" className={label}>Email</label>
          <input
            type="text"
            placeholder="name@example.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`${input} bg-zinc-800`}
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
            className={input}
            disabled={isSubmitting}
          />
        </div>


        <div className="inline-flex my-4">
          <button type="submit" className="inline-flex items-center w-full h-[2.7em] rounded-[10px] border border-zinc-500 text-stone-500 font-medium px-5" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login to Eventhive"}
            <span className="ml-[10px]">
              <FaArrowRight />
            </span>
          </button>
        </div>
      </form>

      <p>
        Don't have an account? <Link to="/signup">Sign up</Link> to your account
      </p>
    </div>
  )
}
