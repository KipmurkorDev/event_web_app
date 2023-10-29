import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { FaCalendarAlt, FaPlus, FaMinus } from "react-icons/fa";
import { Link } from "react-router-dom";

const accessToken = localStorage.getItem("accessToken");
const baseUrl = import.meta.env.VITE_APP_API_URL;

function ExploreEvents() {
  const [events, setEvents] = useState([]);
  const [myEvents, setMyEvents] = useState([]);

  const addToMyEvents = async (eventId) => {
    // Check if the event ID is already in myEvents
    if (myEvents.includes(eventId)) {
      // Event is already in My Events
      alert("Event is already in My Events.");
      return;
    }
    try {
      const response = await axios.post(
        `${baseUrl}/events/my-events/${eventId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response);
      setMyEvents([...myEvents, eventId]);
    } catch (error) {
      console.error("Error adding event to My Events:", error);
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${baseUrl}/events`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(response);
        setEvents(response.data.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-12 py-10">
        {events.map((event) => (
          <div className="card">
            <div
              className="h-[200px] relative rounded-lg"
              style={{
                backgroundImage: `url(${event.image})`,
                backgroundPosition: "cover",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <div
                className="absolute right-0 bottom-0 bg-white p-2 m-4 rounded-full shadow-md cursor-pointer"
                onClick={() => addToMyEvents(event._id)}
              >
                <FaPlus
                  className=""
                  style={{ color: "black", fontSize: "1.5rem" }}
                ></FaPlus>
              </div>
            </div>
            <Link to={`/eventdetails/${event._id}`} key={event.id}>
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
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExploreEvents;
