import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const baseUrl = import.meta.env.VITE_APP_API_URL;
const accessToken = localStorage.getItem("accessToken");

const EditEvent = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState({
    eventName: "",
    description: "",
    image: "",
    category: "",
    location: "",
    dateTime: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${baseUrl}/events/${eventId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setEvent(response.data); // Set the event data from the response
      } catch (error) {
        console.error("Error fetching event:", error);
        toast.error("Error fetching event. Please try again later.");
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const handleEditEvent = async () => {
    setIsSubmitting(true);

    try {
      const response = await axios.put(
        `${baseUrl}/events/${eventId}`,
        event,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Event updated successfully");
        // You can navigate back to the event details page or take other actions as needed
      } else {
        console.error("Error updating event:", response.data);
        toast.error("Error updating the event. Please try again later.");
      }
    } catch (error) {
      console.error("Error updating event:", error);
      toast.error("Error updating the event. Please try again later.");
    }

    setIsSubmitting(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Edit Event</h2>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="eventName" className="text-lg font-medium">
            Event Name
          </label>
          <input
            type="text"
            placeholder="Name of event"
            name="eventName"
            className="h-[2.7em] rounded-[10px] px-4 py-2"
            value={event.eventName}
            onChange={handleChange}
            disabled={isSubmitting}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="text-lg font-medium">
            Description
          </label>
          <textarea
            placeholder="Description of event"
            name="description"
            className="h-[8em] rounded-[10px] px-4 py-2"
            value={event.description}
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
            onChange={handleChange}
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
            value={event.category}
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
            value={event.location}
            onChange={handleChange}
            disabled={isSubmitting}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="dateTime" className="text-lg font-medium">
            Date
          </label>
          <input
            type="datetime-local"
            name="dateTime"
            className="h-[2.7em] rounded-[10px] px-4 py-2"
            value={event.dateTime}
            onChange={handleChange}
            disabled={isSubmitting}
          />

        </div>
        {/* Other form fields for description, image, category, location, and dateTime */}
        {/* Ensure that each input's name and value attributes match the state properties */}
        <div className="flex justify-center">
          <button
            type="button" // Use type="button" to prevent form submission
            onClick={handleEditEvent}
            className="h-[3em] w-[12em] text-white font-medium bg-red-500 rounded-xl hover:bg-red-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update Event"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEvent;
