import React from "react";
import { Link } from "react-router-dom";
import feature_img from "./Feature_collage.svg";

function HomePage() {
  return (
    <div className="">
      {/* First Section */}
      <div className="flex flex-col md:flex-row lg:max-w-[1400px] mx-auto gap-12 pt-4 md:pt-14 px-8">
        <div className="flex order-2 md:order-1 flex-col align-middle justify-center">
          <h1 className="font-bold text-3xl lg:text-4xl mb-10">
            Machine Learning and Data Analytic with{" "}
            <span className="text-primary-btn underline">
              Zero Line Of Code
            </span>
          </h1>
          <p className="text-md lg:text-lg">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea
            officiis iure porro rerum itaque nobis sunt laudantium quo sapiente
            impedit.
          </p>
          <div className="mt-10 flex gap-8">
            <button className="cursor-pointer bg-primary-btn px-6 py-4 rounded-md hover:translate-x-0 hover:translate-y-[-3px] hover:shadow-accent hover:shadow-[0px_20px_80px_-10px] duration-150 font-medium">
              <Link to={"/editor"}>Get Started</Link>
            </button>
            <button className="cursor-pointer bg-secondary-btn px-6 py-4 rounded-md hover:translate-x-0 font-medium hover:translate-y-[-3px] shadow-sm duration-150">
              Request A Demo
            </button>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <img
            src="/iso-ai.jpg"
            alt=""
            className="w-full max-h-[700px] h-full object-contain object-center"
          />
        </div>
      </div>

      {/* Second Section */}
      <div className="mt-16 lg:max-w-[1200px] mx-auto text-center px-8">
        <div>
          <h1 className="text-3xl font-bold mb-4">
            A Complete Platform for Machine Learning
          </h1>
          <p className="text-xl">
            Find solutions to accelerate machine learning tasks with zero
            knowledge of code.
          </p>
        </div>
        <div className="flex align-middle justify-around mt-6 flex-wrap">
          <div className="flex border border-gray-300 shadow-md py-2 mt-4 px-4 items-center gap-4 rounded">
            <div>
              <img src="/2.png" alt="" className="w-28 h-full max-h-28" />
            </div>
            <h3 className="font-medium text-text text-xl">Model & Visualize</h3>
          </div>
          <div className="flex border border-gray-300 shadow-md py-2 mt-4 px-4 items-center gap-4 rounded">
            <div>
              <img src="/1.png" alt="" className="w-28 h-full max-h-28" />
            </div>
            <h3 className="font-medium text-text text-xl">Blend & Transform</h3>
          </div>
          <div className="flex border border-gray-300 shadow-md py-2 mt-4 px-4 items-center gap-4 rounded">
            <div>
              <img src="/3.png" alt="" className="w-28 h-full max-h-28" />
            </div>
            <h3 className="font-medium text-text text-xl">Deploy & Monitor</h3>
          </div>
        </div>
      </div>

      {/* Third Section */}
      <div className="mt-20 bg-secondary-btn">
        <div className="max-w-[1200px] mx-auto px-8 pt-16 pb-8">
          <h1 className="font-bold text-3xl mb-6">
            A MACHINE LEARNING BASED DATA ANALYSIS AND EXPLORATION SYSTEM FOR
            MATERIAL DESIGN
          </h1>
          <p className="font-light mb-8">
            MatFlow is a web-based dataflow framework for visual data
            exploration. A machine learning-based data analysis and exploration
            system for material design is a computer system that uses machine
            learning algorithms to analyze and explore large amounts of material
            design data. This system can be used to identify patterns and
            relationships in the data, generate insights and predictions, and
            support decision-making in the field of material design. The system
            can be trained on existing data to improve its accuracy and can also
            be updated with new data as it becomes available to continue
            learning and improving its performance.
          </p>
          <img src={feature_img} alt="" className="w-full h-full" />
        </div>
      </div>

      {/* Fourth Section */}
      <div className="mt-16 p-16">
        <div className="text-center">
          <h1 className="font-bold text-4xl mb-4">Get started today.</h1>
          <div>
            <button className="cursor-pointer px-6 py-4 bg-primary-btn rounded shadow mr-6">
              <Link to={"/register"}>Create Free Account</Link>
            </button>
            <button className="cursor-pointer py-2 shadow border-b-2 border-primary-btn">
              <Link to={"/contact-us"}>Contact Us</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
