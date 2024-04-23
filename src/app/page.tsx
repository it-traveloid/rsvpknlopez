"use client";
import { useState } from "react";
import Form from "./ui/Form";
import Image from "next/image";

import { Step } from "@/types";
import Deck from "./ui/Card2";

export default function Home() {
  const [step, setStep] = useState<Step>(Step.Card);

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center w-screen overflow-hidden h-full"
      style={{
        WebkitBackfaceVisibility: "hidden",
        WebkitPerspective: 1000,
      }}
    >
      <div
        className="absolute h-full w-full"
        style={{
          backgroundImage: `url(${"/beach.gif"})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      <>
        {step === Step.Card && (
          <>
            <Deck setStep={setStep} />
            <div
              className={`w-full h-full flex items-center justify-center bg-white bg-opacity-70 animate-fade-out-up`}
              style={{
                animationDelay: "2s",
              }}
            >
              <Image
                src={"/swipeRight.gif"}
                width={150}
                height={150}
                alt="swipe"
              />
            </div>
          </>
        )}

        {step === Step.Form && (
          <>
            <div
              className="flex bg-black relative md:rounded-lg md:flex-row md:w-1/3 md:h-3/4 overflow-hidden bg-opacity-80 animate-fade-in-down
              h-full w-full
              flex-col
            "
            >
              <Form setStep={setStep} />
            </div>
          </>
        )}
        {step === Step.Success && (
          <div
            className="flex bg-black relative md:flex-row md:w-1/2 md:h-1/2 overflow-hidden bg-opacity-80 animate-fade-in-down
            h-full w-full
            flex-col
          "
          >
            <div className="flex-auto p-10 flex flex-col justify-center items-center font-poppins">
              <h1 className="text-7xl text-white mb-4  font-nanum">See you!</h1>

              <p className="text-white text-center text-xl tracking-wide  mb-4 ">
                Thank you for accepting our invitation to share in our special
                day! Your presence means the world to us. Get ready to toast,
                dance, and make unforgettable memories that will last a
                lifetime. Let the wedding countdown begin!
              </p>
              <p className="text-white">
                <span className="text-4xl">{`\u2665`}</span>
              </p>
            </div>
          </div>
        )}

        {step === Step.Rejected && (
          <div
            className="flex bg-black  relative md:flex-row md:w-1/2 md:h-1/2 overflow-hidden bg-opacity-80 animate-fade-in-down
            h-full w-full
            flex-col
          "
          >
            <div className="flex-auto p-8 flex flex-col justify-center items-center">
              <h1 className="text-3xl text-white">
                We&apos;re sorry you can&apos;t make it. We&apos;ll miss you!
              </h1>
            </div>
          </div>
        )}
      </>
    </main>
  );
}
