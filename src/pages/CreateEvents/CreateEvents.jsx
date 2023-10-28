import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AddressAutofill, SearchBox } from "@mapbox/search-js-react";

// console.log(import.meta.env.VITE_ACCESS_TOKEN);
// console.log(import.meta.env.VITE_AUTH_TOKEN);
const access_token = import.meta.env.VITE_ACCESS_TOKEN;
const auth_token = import.meta.env.VITE_AUTH_TOKEN;

const CreateEvent = () => {

  const initialFormData = {
    event: "",
    image: null,
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
    console.log(formData)
    try {
      const response = await axios.post(
        "http://ec2-51-20-84-219.eu-north-1.compute.amazonaws.com/events", formData,
        {
          headers: {
            Authorization: `Bearer ${auth_token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Event created successfully");
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

  // Handle image input change
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    try {
      // Create a FormData object to send to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "event-hive");

      // Send the file to Cloudinary
      const response = await axios.post("https://api.cloudinary.com/v1_1/dx3xbo8ez/image/upload", formData);

      // Get the secure_url from the response / get the image URL from the Cloudinary response
      const imageUrl = response.data.secure_url;

      // Update the formData state with the image URL
      setFormData((prevData) => ({ ...prevData, image: imageUrl }));
    }
    catch (error) {
      console.error("Error uploading image to Cloudinary", error);
    }
  };

  const handleLocationSelect = (result) => {
    setFormData((prevData) => ({
      ...prevData,
      location: result.place_name,
    }));
  };

  return (
    <div className="px-4 py-4 sm:px-6 lg:px-8 font-Montserrat">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="event" className="text-lg font-medium">
            Event Name
          </label>
          <input
            type="text"
            placeholder="Name of event"
            name="event"
            className="h-[2.7em] rounded-[10px] px-4 py-2"
            value={formData.event}
            onChange={handleChange}
            disabled={isSubmitting}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="image" className="text-lg font-medium">
            Event Image
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            value={formData.image}
            onChange={handleImageChange}
            disabled={isSubmitting}
          />
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
          <SearchBox
            accessToken={access_token}
            onSelect={handleLocationSelect}
          >
          </SearchBox>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="date" className="text-lg font-medium">
            Date
          </label>
          <input
            type="datetime-local"
            name="date"
            className="h-[2.7em] rounded-[10px] px-4 py-2"
            value={formData.date}
            onChange={handleChange}
            disabled={isSubmitting}
          />
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
