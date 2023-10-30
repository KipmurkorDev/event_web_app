import React from "react";
import FooterSVG from "../../assets/bg-grain.svg";

function Footer() {
  const bgImage = `url(${FooterSVG})`;

  return (
    <div
      className="bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: bgImage }}
    >
      <div className="bg-black bg-opacity-90 text-white py-8">
        <div className="flex flex-col items-center justify-center h-full text-center">
          <p className="font-extrabold text-2xl">EventHub</p>
          <p className="text-sm">1234 Event Street, Cityville, State 12345</p>
          <p className="text-sm">info@eventhub.com</p>
          <div className="mt-4">
            <a href="/about" className="text-white hover:underline">
              About Us
            </a>
            <span className="text-white mx-2">|</span>
            <a href="/contact" className="text-white hover:underline">
              Contact Us
            </a>
          </div>
          <p className="text-xs mt-4">
            &copy; {new Date().getFullYear()} EventHub
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
