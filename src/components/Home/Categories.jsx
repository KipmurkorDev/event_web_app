import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  FaGuitar,
  FaSwimmer,
  FaGlassMartiniAlt,
  FaPizzaSlice,
} from "react-icons/fa";

const categoryData = [
  { type: "music", icon: <FaGuitar />, color: "purple" },
  { type: "sports", icon: <FaSwimmer />, color: "purple" },
  { type: "food", icon: <FaGlassMartiniAlt />, color: "purple" },
  { type: "party", icon: <FaPizzaSlice />, color: "purple" },
  { type: "conference", icon: <FaPizzaSlice />, color: "purple" },
  { type: "festival", icon: <FaPizzaSlice />, color: "purple" },
  { type: "art", icon: <FaPizzaSlice />, color: "purple" },
  { type: "tech", icon: <FaPizzaSlice />, color: "purple" },
  { type: "others", icon: <FaPizzaSlice />, color: "purple" },
];

function CategoryCard({ icon, type, color }) {
  return (
    <Link to={`/category/${type}`}>
      <div
        className={`rounded-lg bg-gradient-to-br from-${color}-400 to-${color}-600 h-56 min-w-fit flex flex-col items-center justify-center relative group shadow-lg transition-transform transform hover:scale-105 duration-300`}
      >
        <div className="text-[40px] group-hover:text-white">{icon}</div>
        <div className="text-white uppercase font-semibold text-[24px] group-hover:text-white mt-2">
          {type}
        </div>
      </div>
    </Link>
  );
}

function Categories() {
  const [startIndex, setStartIndex] = useState(0);

  const nextSlide = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % categoryData.length);
  };

  const prevSlide = () => {
    setStartIndex((prevIndex) =>
      prevIndex === 0 ? categoryData.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="py-10 px-8 font-['Montserrat'] h-96 relative my-14">
      <h2 className="font-bold text-2xl py-4 ml-8 text-gray-800">
        Event Categories
      </h2>
      <div className="bg-[#f0f0f0] h-48">
        <div className="p-6 flex flex-col gap-3">
          <FaArrowLeft
            className="cursor-pointer text-gray-600 hover:text-gray-800"
            onClick={prevSlide}
          />
          <FaArrowRight
            className="cursor-pointer text-gray-600 hover:text-gray-800"
            onClick={nextSlide}
          />
        </div>
        <div className="grid grid-cols-5 gap-8 mt-6 absolute right-16">
          {categoryData.slice(startIndex, startIndex + 5).map((item, index) => (
            <CategoryCard
              key={index}
              icon={item.icon}
              type={item.type}
              color={item.color}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Categories;
