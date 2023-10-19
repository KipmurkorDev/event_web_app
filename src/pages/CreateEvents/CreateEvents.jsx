import React, { useState, useEffect } from "react";
import { addEvent, myEvents } from "../../Services/data";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const initialFormData = {
    event: "",
    category: "tech",
    location: "",
    date: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        "http://ec2-51-20-84-219.eu-north-1.compute.amazonaws.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.status === 200) {
        console.log("Event created successfully");
        addEvent(formData);
        console.log(myEvents());
        navigate("/myevents");
      } else {
        console.error("Event creation failed");
      }
    } catch (error) {
      console.error("API request failed", error);
    }

    setIsSubmitting(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="px-4 py-4 sm:px-6 lg:px-8 font-Montserrat">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
          <label
            htmlFor="event"
            className="text-black text-opacity-60 text-lg font-medium"
          >
            Event Name
          </label>
          <input
            type="text"
            placeholder="Name of event"
            name="event"
            className="h-[2.7em] bg-zinc-300 rounded-[10px] px-4 py-2"
            value={formData.event}
            onChange={handleChange}
            disabled={isSubmitting}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="category"
            className="text-black text-opacity-60 text-lg font-medium"
          >
            Category
          </label>
          <select
            name="category"
            className="h-[2.7em] bg-zinc-300 rounded-[10px] px-4 py-2"
            value={formData.category}
            onChange={handleChange}
            disabled={isSubmitting}
          >
            <option value="tech">Tech</option>
            <option value="sports">Sports</option>
            <option value="business">Business</option>
            <option value="party">Party</option>
            <option value="education">Education</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="location"
            className="text-black text-opacity-60 text-lg font-medium"
          >
            Location
          </label>
          <input
            type="text"
            name="location"
            className="h-[2.7em] bg-zinc-300 rounded-[10px] px-4 py-2"
            value={formData.location}
            onChange={handleChange}
            disabled={isSubmitting}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="date"
            className="text-black text-opacity-60 text-lg font-medium"
          >
            Date
          </label>
          <input
            type="date"
            name="date"
            className="h-[2.7em] bg-zinc-300 rounded-[10px] px-4 py-2"
            value={formData.date}
            onChange={handleChange}
            disabled={isSubmitting}
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className=" h-[3em] w-[12em] font-medium bg-red-500 rounded-xl"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Event"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
