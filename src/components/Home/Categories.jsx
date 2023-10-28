import { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { category } from '../../Services/data';
import { Link, useParams } from 'react-router-dom';
import { FaGuitar, FaSwimmer, FaGlassMartiniAlt, FaPizzaSlice } from 'react-icons/fa';
import axios from 'axios'

const auth_token = import.meta.env.VITE_AUTH_TOKEN;
const baseUrl = import.meta.env.VITE_APP_API_URL;

function CategoryCard({ icon, type, color }) {

  const icons = {
    music: <FaGuitar />,
    sports: <FaSwimmer />,
    food: <FaGlassMartiniAlt />,
    party: <FaPizzaSlice />,
    conference: <FaPizzaSlice />,
    festival: <FaPizzaSlice />,
    art: <FaPizzaSlice />,
    tech: <FaPizzaSlice />,
    others: <FaPizzaSlice />,
  };

  const colors = {
    music: 'red',
    sports: 'blue',
    food: 'green',
    party: 'yellow',
    conference: 'purple',
    festival: 'pink',
    art: 'orange',
    tech: 'indigo',
    others: 'red',
  };

  icon = icons[type];
  color = colors[type];

  return (
    <Link to={`/category/${type}`}>
      <div className={`card bg-${color}-500 h-56 w-36 flex flex-col items-center justify-center align-bottom relative`}>
        <div className='text-[40px] absolute bottom-9 right-0'>{icon}</div>
        <div className=' text-white uppercase font-bold text-[24px] absolute bottom-0 right-0'>{type}</div>
      </div>
    </Link>
  );
}

function Categories() {
  const [categories, setCategories] = useState([])
  const [startIndex, setStartIndex] = useState(0);


  const nextSlide = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % category.length);
  };

  const prevSlide = () => {
    setStartIndex((prevIndex) => (prevIndex === 0 ? category.length - 1 : prevIndex - 1));
  };

  // const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'pink', 'orange', 'indigo'];

  useEffect(() => {
    const fetchCategories = async (e) => {
      try {
        const response = axios.get(`${baseUrl}/categories`, {
          headers: {
            'Authorization': `Bearer ${auth_token}`
          }
        })
        setCategories(response.data)
      } catch (error) {
        console.log('Error fetching categories', error)
      }
    }
    fetchCategories();
  }, [])

  return (
    <div className="py-10 px-8 font-['Montserrat'] h-96 relative my-14">
      <h2 className="font-bold text-xl py-3.5 ml-9">Event Categories</h2>
      <div className="bg-[#d9d9d9] h-48">
        <div className='p-6 flex flex-col gap-3'>
          <FaArrowLeft className="cursor-pointer" onClick={prevSlide} />
          <FaArrowRight className="cursor-pointer" onClick={nextSlide} />
        </div>
        <div className="grid grid-cols-5 gap-8 mt-6 absolute right-16">
          {category.slice(startIndex, startIndex + 5).map((item, index) => (
            <CategoryCard key={item.id} icon={item.icon} type={item.type} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Categories;
