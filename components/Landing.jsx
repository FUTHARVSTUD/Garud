"use client";
import React from "react";
import { BackgroundBeams } from "./ui/background-beams";
import { Button } from "./ui/moving-border-btn";
import { useLoginModalState } from "@/store/store";
import Image from 'next/image';

const Landing = () => {
  const setIsOpen = useLoginModalState((state) => state.updateOpen);

  return (
    <div className="h-screen w-full bg-neutral-950 pt-14 relative justify-center antialiased">
      <div className="mx-auto p-0 md:p-4">
        <h1 className="relative text-4xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">
          Welcome To Garud
        </h1>
        <p className="mt-2 underline text-xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 to-neutral-600 text-center font-sans font-bold">Soaring above safeguarding below</p>
      </div>
      <div>
        <div className="z-[999] w-full mt-8 flex items-center justify-center">
          <Button
            borderRadius="1.75rem"
            className="text-lg relative z-[999] font-semibold bg-slate-900 text-white border-slate-800"
            onClick={() => setIsOpen(true)}
          >
            Login
          </Button>
        </div>
        <div className="flex gap-4 w-full items-center justify-center mt-24">
          <div className="w-full relative max-w-lg">
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl"></div>
            <div className="relative shadow-xl bg-gray-900 border border-gray-800 px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
              <h1 className="font-bold text-xl text-white mb-4 relative z-50">
                Heading 1
              </h1>
              <div className="font-normal text-base text-slate-500 mb-4 relative z-50 h-full w-full">
                <Image
                  src="/image/b55fac21-f93d-448f-9866-12922f74eca9.jpg"
                  alt="A"
                  width={900}
                  height={900}
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
          <div className="w-full relative max-w-lg">
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl"></div>
            <div className="relative shadow-xl bg-gray-900 border border-gray-800 px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
              <h1 className="font-bold text-xl text-white mb-4 relative z-50">
                AF
              </h1>
              <div className="font-normal text-base text-slate-500 mb-4 relative z-50 h-full w-full">
                <Image
                  src="/image/a9bd9cb1-93e5-4fd7-bb69-3ab75eb90fa2.jpg"
                  alt="B"
                  width={900}
                  height={900}
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <BackgroundBeams />
    </div>
  );
};

export default Landing;
