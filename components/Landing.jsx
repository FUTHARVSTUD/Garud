import React from "react";
import { BackgroundBeams } from "./ui/background-beams";
import { Button } from "./ui/moving-border-btn";

const Landing = () => {
  return (
    <div className="h-screen w-full bg-neutral-950 pt-14 relative justify-center antialiased">
      <div className=" mx-auto p-0 md:p-4">
        <h1 className="relative text-4xl md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          Welcome To Garud
        </h1>
        <p className="mt-4 underline text-xl md:text-3xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 to-neutral-600  text-center font-sans font-bold">Soaring above safe guarding below</p>
      </div>
      <div>
      <div className=" w-full mt-8 flex items-center justify-center">
        <Button
            borderRadius="1.75rem"
            className="text-lg font-semibold bg-slate-900 text-white border-slate-800"
        >
            Login
        </Button>
    </div>
      </div>
      <BackgroundBeams />
    </div>
  );
};

export default Landing;
