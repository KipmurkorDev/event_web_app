import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify"; // Assuming you're using a toast library

const baseUrl = import.meta.env.VITE_APP_API_URL;

const EventCard = ({ event, handleDeleteEvent }) => {
  return (
    <div className="bg-white p-4 shadow-lg rounded-lg">
      <h3 className="text-xl font-semibold mb-2">{event.eventName}</h3>
      <p className="text-gray-600 mb-2">{event.dateTime}</p>
      <p className="text-gray-600">{event.location}</p>
      <img
        src={event.image}
        alt={event.eventName}
        className="w-full h-48 object-cover object-center mb-2"
      />
      <div className="flex justify-between mt-2">
        <Link to={`/edit-event/${event._id}`} className="text-blue-600">
          Edit
        </Link>
        <button
          onClick={() => handleDeleteEvent(event._id)}
          className="text-red-600 cursor-pointer"
        >
          Delete
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
        // Remove the deleted event from the state
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
      <h2 className="text-2xl font-bold mb-4">My Events</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
