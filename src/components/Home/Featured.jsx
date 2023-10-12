import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Featured = () => {
  const [featuredEvents, setFeaturedEvents] = useState([]);

  useEffect(() => {
    axios.get('https://www.eventbriteapi.com/v3/categories', {
        params: {
            'organizer.id': 'YOUR_ORGANIZER_ID',
        },
        headers: {
            Authorization: 'Bearer 5RENH766U6BAGUEKLAEJ',
        },
    })
    .then((response) => {
        console.log(response.data.events);
        setFeaturedEvents(response.data.events);
    })
    .catch((error) => {
        console.error('Error fetching featured events', error);
    });
  }, []);

  return (
    <div>
      <h2>Featured Events</h2>
      <ul>
        {featuredEvents.map((event) => (
          <li key={event.id}>{event.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Featured;
