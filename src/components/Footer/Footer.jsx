import React from 'react';
import FooterSVG from '../../assets/bg-grain.svg';

function Footer() {
  const bgImage = `url(${FooterSVG})`;

  return (
    <div
      className="bg-no-repeat bg-cover bg-center h-24"
      style={{ backgroundImage: bgImage }}
    >
      <div className="flex justify-center items-center h-full">
        <div className="flex flex-col gap-2">
          <p className="text-white font-medium text-lg">Made with ❤️ by</p>
          <p className="text-white font-medium text-lg">Team 3</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
