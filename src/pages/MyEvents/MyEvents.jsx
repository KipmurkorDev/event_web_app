import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import { FaCalendarAlt, FaPen, FaTrash } from "react-icons/fa";

const baseUrl = import.meta.env.VITE_APP_API_URL;

const EventCard = ({ event, handleDeleteEvent }) => {
  return (
    <div className="bg-white p-2 shadow-lg rounded-lg ">
      <Link to={`/eventdetails/${event._id}`} key={event.id}>
        <img
          src={event.image}
          alt={event.eventName}
          className="w-full h-48 object-cover object-center mb-2 rounded-lg transform transition-transform hover:scale-105"
        />
      </Link>
      <h2 className="text-stone-900 text-2xl font-bold font-['Montserrat'] py-3">
        {event.eventName}
      </h2>
      <p className="text-black text-opacity-60 text-base font-medium font-['Montserrat']">
        {event.description}
      </p>
      <div className="flex justify-between items-center py-3">
        <div className="inline-flex">
          <FaCalendarAlt />
          <p className="ml-2 text-black text-opacity-60 text-sm font-semibold">
            {moment(event.dateTime).format("ddd, MMM D, h:mm A")}
          </p>
        </div>
        <div>
          <p className="text-black text-opacity-60 text-sm font-semibold">
            Nairobi, Kenya
          </p>
        </div>
      </div>
      <p className="text-stone-900 text-2xl font-bold font-['Montserrat'] py-3 uppercase">
        {event.category}
      </p>
      <div className="flex justify-between mt-2">
        <Link
          to={`/events/${event._id}`}
          className="text-blue-600 inline-flex items-center gap-2"
        >
          <FaPen />
          <p className="mr-2">Edit</p>
        </Link>
        <button
          onClick={() => handleDeleteEvent(event._id)}
          className="text-red-600 cursor-pointer inline-flex items-center gap-2"
        >
          <FaTrash />
          <p>Delete</p>
        </button>
      </div>
    </div>
  );
};

function MyEvents() {
  const [events, setEvents] = useState([]);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${baseUrl}/events/my-events`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setEvents(response.data.data);
      } catch (error) {
        console.error("Error fetching events:", error);
        toast.error("Error fetching events. Please try again later.");
      }
    };

    fetchEvents();
  }, [accessToken]);

  const handleDeleteEvent = async (eventId) => {
    try {
      const response = await axios.delete(`${baseUrl}/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        toast.success("Event deleted successfully");
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event._id !== eventId)
        );
      } else {
        console.error("Error deleting event:", response.data);
        toast.error("Error deleting the event. Please try again later.");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Error deleting the event. Please try again later.");
    }
  };

  return (
    <div>
      <h2 className="text-4xl font-bold mb-4 p-6">My Events</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-12 py-10">
        {events.length > 0 ? (
          events.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              handleDeleteEvent={handleDeleteEvent}
            />
          ))
        ) : (
          <p>No events to display.</p>
        )}
      </div>
    </div>
  );
}

export default MyEvents;
