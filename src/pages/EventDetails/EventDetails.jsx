import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const baseUrl = import.meta.env.VITE_APP_API_URL;

function EventDetails() {
  const { eventId } = useParams();
  const [event, setEvent] = useState({});

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${baseUrl}/events/${eventId}`);
        setEvent(response.data.data);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchEvent();
  }, [eventId]);

  return (

    <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen flex flex-col items-center justify-center">
      {event ? (
        <div className="max-w-md p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
            {event.eventName}
          </h1>
          <div className="w-full h-64 mb-4">
            <img
              src={event.image}
              alt="Event"
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          </div>
          <p className="text-lg text-gray-600 mb-4">
            <span className="font-semibold">Category:</span> {event.category}
          </p>
          <p className="text-lg text-gray-600 mb-4">
            <span className="font-semibold">Description:</span> {event.description}
          </p>
          <p className="text-lg text-gray-600 mb-4">
            <span className="font-semibold">Location:</span> {event.location}
          </p>
          <p className="text-lg text-gray-600 mb-4">
            <span className="font-semibold">Date and Time:</span>{" "}
            {new Date(event.dateTime).toLocaleString()}
          </p>
        </div>
      ) : (
        <p className="text-2xl font-bold text-white">Loading...</p>
      )}
    </div>
  );
}

export default EventDetails;
