import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
// import { category } from "../../Services/data";

const auth_token = import.meta.env.VITE_AUTH_TOKEN;
const baseUrl = import.meta.env.VITE_APP_API_URL;

function Categories() {
  const [category, setCategory] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  const nextSlide = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % category.length);
  };

  const prevSlide = () => {
    setStartIndex((prevIndex) =>
      prevIndex === 0 ? category.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.post(
          `${baseUrl}/events/category`,
          {
            category: 'education',
          },
          {
            headers: {
              Authorization: `Bearer ${auth_token}`,
            },
          }
        );
        console.log(response.data.data);

        if (Array.isArray(response.data.data)) {
          setCategory(response.data.data);
        } else {
          // If the response is an object, convert it to an array or handle it accordingly
          const categoryArray = Object.values(response.data.data);
          setCategory(categoryArray);
        }
      } catch (error) {
        console.log("Error fetching categories", error);
      }
    };
    fetchCategories();
  }, []);


  return (
    <div className="py-10 px-8 font-['Montserrat'] h-96 relative my-14">
      <h2 className="font-bold text-xl py-3.5 ml-9">Event Categories</h2>
      <div className="bg-[#d9d9d9] h-48">
        <div className="p-6 flex flex-col gap-3">
          <FaArrowLeft className="cursor-pointer" onClick={prevSlide} />
          <FaArrowRight className="cursor-pointer" onClick={nextSlide} />
        </div>
        <div className="grid grid-cols-5 gap-8 mt-6 absolute right-16">
          {category.map((item) => {
            return (
              <Link to={`/item/${item.name}`} key={item.id}>
                <div>
                  <ul>
                    <li className="bg-purple h-[6.5em] w-full px-3 py-2 ">{item.category === "education" ? ("Education") : ("Party")}</li>
                  </ul>

                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Categories;
