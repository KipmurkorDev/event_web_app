import {useState, useEffect} from 'react'
import axios from 'axios'

const auth_token = import.meta.env.VITE_AUTH_TOKEN;
const baseUrl = import.meta.env.VITE_APP_API_URL;

function ExploreEvents() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${baseUrl}/events/my-events`, {
          headers: {
            Authorization: `Bearer ${auth_token}`
          },
        })
        console.log(response)
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
      <h2>Explore Events</h2>

    </div>
  )
}

export default ExploreEvents
