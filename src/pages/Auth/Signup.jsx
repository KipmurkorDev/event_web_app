import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

function Signup() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    profession: "student",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("http://ec2-51-20-84-219.eu-north-1.compute.amazonaws.com", {
        method: "POST",
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const label = "text-black text-xl font-medium";
  const input = "bg-zinc-800 rounded-[10px] w-full h-[2.7em] px-4 py-2 mt-2 text-black text-lg font-medium";

  return (
    <div className="font-['Montserrat'] p-4 md:ml-4 lg:ml-20 my-8">
      <h2 className="text-black font-medium text-2xl md:text-4xl py-3 md:py-6">Get Started</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col">
          <label htmlFor="fullname" className={label}>Full Name</label>
          <input
            type="text"
            placeholder="Full Name"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            className={input}
            disabled={isSubmitting}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className={label}>Email</label>
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

        <div className="flex flex-col">
          <label htmlFor="profession" className={label}>Profession</label>
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
          <button type="submit" className="inline-flex items-center w-full h-[2.7em] rounded-[10px] border border-zinc-500 text-stone-500 font-medium px-5" disabled={isSubmitting}>
            {isSubmitting ? "Signing Up..." : "Sign up to eventhive"}
            <span className="ml-2">
              <FaArrowRight />
            </span>
          </button>
        </div>
      </form>

      <p className="text-sm md:text-base">
        Already have an account? <Link to="/login">Login</Link> to your account
      </p>
    </div>
  );
}

export default Signup;
