import {useState, useEffect} from 'react'
import axios from 'axios'
import { FaLocationArrow } from 'react-icons/fa';

const auth_token = import.meta.env.VITE_AUTH_TOKEN;
const baseUrl = import.meta.env.VITE_APP_API_URL;

function ExploreEvents() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${baseUrl}/events`, {
          headers: {
            Authorization: `Bearer ${auth_token}`
          },
        });
        console.log(response);

        if (Array.isArray(response.data.data)) {
          // Ensure that response.data is an array
          setEvents(response.data.data);
        } else {
          console.error('Response data is not an array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    // Call the async function when the component mounts
    fetchEvents();
  }, []);



  return (
    <div>
      <h2>Explore Events</h2>
      <div>
        {events.map((event) => {
          return (
            <div className="card flex justify-between">
              <img src={event.image} alt={event.category} />
              <div>
              <p>{event.eventName}</p>
              <h2>{event.category}</h2>
              <div className="flex">
                <div>
                <div>
                <FaLocationArrow />
                <p>{event.dateTime}</p>
              </div>
                </div>
              </div>


              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default ExploreEvents
