import { useState, useEffect } from "react";
import axios from "axios";
import { FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
const accessToken = localStorage.getItem("accessToken");
const baseUrl = import.meta.env.VITE_APP_API_URL;

function ExploreEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${baseUrl}/events`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setEvents(response.data.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Explore Events</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {events.map((event) => (
          <Link to={`/eventdetails/${event._id}`}>
            <div key={event.id} className="card p-4 shadow-lg">
              <img src={event.image} alt={event.category} />
              <div className="p-4">
                <p className="text-xl font-semibold">{event.eventName}</p>
                <h2 className="text-gray-600">{event.category}</h2>
                <div className="flex items-center mt-2">
                  <FaCalendarAlt />
                  <p className="ml-2">{event.dateTime}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ExploreEvents;
