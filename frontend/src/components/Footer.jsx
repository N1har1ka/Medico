import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div className="flex flex-col gap-2">
          <div
            onClick={() => {
              navigate("/");
            }}
            className="flex items-center"
          >
            <img className="w-12 cursor-pointer" src={assets.logo} alt="" />
            <p className="text-3xl font-medium cursor-pointer">Medico</p>
          </div>
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Medico is a one‑stop healthcare platform designed to simplify your
            life. Whether you need a quick teleconsultation or a specialist
            referral, Medico connects you with trusted clinicians near you. No
            more endless hold times or crowded waiting rooms—just easy,
            efficient care, when you need it.
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5 mt-3 pt-1">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5 mt-3 pt-1">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+1-21-456-7890</li>
            <li>niharika.202310@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2025@ Medico - All Right Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
