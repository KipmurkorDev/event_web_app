import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Hero = (props) => {
  return (
    <>
      <div className="bg-[#dfdfdf] flex flex-col py-8 px-6 mx-4 my-2 rounded-lg">
        <div className="my-14">
            <div className="w-[20em]">
          <h2 className="text-black font-bold text-4xl pb-4">
            Discover. Connect. <span className="text-[#E75151]">Discover.</span>
          </h2>
          </div>
          <p className="font-light text-xl">Your event journey starts here</p>
          <Link to='/createevents'><button className="bg-black py-2 mt-4 px-6 text-white text-3xl font-normal font-['Italianno']">Create Events</button></Link>
        </div>
      </div>
    </>
  );
};

Hero.propTypes = {};

export default Hero;
