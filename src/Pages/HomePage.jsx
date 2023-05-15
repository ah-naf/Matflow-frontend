import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="">
      <div className="flex max-w-7xl mx-auto gap-12 pt-14">
        <div className="flex flex-col align-middle justify-center">
          <h1 className="font-bold text-4xl mb-10">
            Machine Learning and Data Analytic with <span className="text-primary-btn underline">Zero Line Of Code</span>
          </h1>
          <p className="text-lg">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea
            officiis iure porro rerum itaque nobis sunt laudantium quo sapiente
            impedit.
          </p>
          <div className="mt-10 flex gap-8">
            <button className="cursor-pointer bg-primary-btn px-6 py-4 rounded-md hover:translate-x-0 hover:translate-y-[-3px] hover:shadow-accent hover:shadow-[0px_20px_80px_-10px] duration-150 font-medium">
                <Link to={'/editor'}>Get Started</Link>
            </button>
            <button className="cursor-pointer bg-secondary-btn px-6 py-4 rounded-md hover:translate-x-0 font-medium hover:translate-y-[-3px] shadow-sm duration-150">Request A Demo</button>
          </div>
        </div>
        <div>
          <img src="/iso-ai.jpg" alt="" className="w-full max-h-[700px]" />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
