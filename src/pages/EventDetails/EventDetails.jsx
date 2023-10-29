import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // Import axios for making HTTP requests

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
  console.log(event);
  return (
    <div>
      {event ? (
        <div>
          <h1>{event.eventName}</h1>
          <img src={event.image} alt="Event" />
          <p>Category: {event.category}</p>
          <p>Description: {event.description}</p>
          <p>Location: {event.location}</p>
          <p>Date and Time: {new Date(event.dateTime).toLocaleString()}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default EventDetails;
