import {useState, useEffect} from 'react'
import axios from 'axios'

const auth_token = import.meta.env.VITE_AUTH_TOKEN;
const baseUrl = import.meta.env.VITE_APP_API_URL;

function MyEvents() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${baseUrl}/events`, {
          headers: {
            Authorization: `Bearer ${auth_token}`
          },
        })
        // set event data in the state
        setEvents(response.data)
      } catch (error) {
        console.error('Error fetching events:', error)
      }
    };
    // Call the async function when the component mounts
    fetchEvents();
  },[])


  return (
    <div>
      <h2>My Events</h2>
      <ul>
        {events.map(event => (
          <li key={event.id}>{event.name}</li>

        ))}
      </ul>
    </div>
  )
}

export default MyEvents
