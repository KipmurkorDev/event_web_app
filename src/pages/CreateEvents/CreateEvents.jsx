import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { AddressAutofill, SearchBox } from "@mapbox/search-js-react";
const baseUrl = import.meta.env.VITE_APP_API_URL;

const CreateEvent = () => {
  const initialFormData = {
    eventName: "",
    image: null,
    description: "",
    category: "tech",
    location: "",
    dateTime: "",
  };
  const accessToken = localStorage.getItem("accessToken");

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${baseUrl}/events`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 201) {
        toast.success("Successfully created event", {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate("/myevents");
      } else {
        console.error("Event creation failed");
        toast.error("Error creating events");
      }
    } catch (error) {
      if (error.response) {
        setIsSubmitting(false);
        if (error.response.status === 400) {
          setErrors(error.response.data.errors);
          toast.error("Some fields are missing");
        } else if (error.response.status === 409) {
          toast.error("Event already created");
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
    const { name, value, type } = e.target;
    if (type === "file") {
      const file = e.target.files[0];
      setFormData((prevData) => ({ ...prevData, [name]: file }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
    setErrors({ ...errors, [name]: undefined });
  };

  const handleChangeLocation = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors({ ...errors, [name]: undefined });
    fetchLocationSuggestions(value);
  };

  const fetchLocationSuggestions = (query) => {
    const apiKey = import.meta.env.VITE_MAP_API_KEY;
    const endpoint = `https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${apiKey}`;
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "OK" && data.results) {
          const suggestions = data.results.map(
            (result) => result.formatted_address
          );
          console.log(suggestions);
        }
      })
      .catch((error) => {
        console.error("Error fetching location suggestions:", error);
      });
  };

  return (
    <div className="px-4 py-4 sm:px-6 lg:px-8 font-Montserrat">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="eventName" className="text-lg font-medium">
            Event Name
          </label>
          <input
            type="text"
            placeholder="Name of event"
            name="eventName"
            className="h-[2.7em] rounded-[10px] px-4 py-2"
            value={formData.eventName}
            onChange={handleChange}
            disabled={isSubmitting}
          />
          {errors.eventName && (
            <div className="text-red-500">{errors.eventName}</div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="text-lg font-medium">
            Description
          </label>
          <textarea
            placeholder="Description of event"
            name="description"
            className="h-[8em] rounded-[10px] px-4 py-2"
            value={formData.description}
            onChange={handleChange}
            disabled={isSubmitting}
          />
          {errors.description && (
            <div className="text-red-500">{errors.description}</div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="image" className="text-lg font-medium">
            Event Image
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            disabled={isSubmitting}
          />
          {errors.image && <div className="text-red-500">{errors.image}</div>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="category" className="text-lg font-medium">
            Category
          </label>
          <select
            name="category"
            className="h-[2.7em] rounded-[10px] px-4 py-2"
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
          <label htmlFor="location" className="text-lg font-medium">
            Location
          </label>
          <input
            type="text"
            placeholder="Enter Location"
            name="location"
            className="h-[2.7em] rounded-[10px] px-4 py-2"
            value={formData.location}
            onChange={handleChangeLocation}
            disabled={isSubmitting}
          />
          {errors.location && (
            <div className="text-red-500">{errors.location}</div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="dateTime" className="text-lg font-medium">
            Date
          </label>
          <input
            type="datetime-local"
            name="dateTime"
            className="h-[2.7em] rounded-[10px] px-4 py-2"
            value={formData.dateTime}
            onChange={handleChange}
            disabled={isSubmitting}
          />
          {errors.dateTime && (
            <div className="text-red-500">{errors.dateTime}</div>
          )}
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="h-[3em] w-[12em] text-white font-medium bg-red-500 rounded-xl hover:bg-red-600"
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
