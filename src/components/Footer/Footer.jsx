import React from 'react';
import FooterSVG from '../../assets/bg-grain.svg';

function Footer() {
  const bgImage = `url(${FooterSVG})`;

  return (
    <div
      className=" bg-red-500 h-24 py-8"
    >
      <div className="flex justify-center items-center h-full">
        <div className="text-white text-center">
          <p className="font-medium text-lg">EventHub &copy; {new Date().getFullYear()}</p>
          <p className="text-sm">1234 Event Street, Cityville, State 12345</p>
          <p className="text-sm">info@eventhub.com</p>
          <div className="mt-4">
            <a href="/about" className="text-white hover:underline">About Us</a>
            <span className="text-white mx-2">|</span>
            <a href="/contact" className="text-white hover:underline">Contact Us</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
