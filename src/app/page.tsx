"use client";
import { useState } from "react";
import Form from "./ui/Form";

import ParticleBackground from "./ui/Particles";
import { Step } from "@/types";
import Deck from "./ui/Card2";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  const [step, setStep] = useState<Step>(Step.Card);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center w-screen overflow-hidden h-screen">
      <div className="absolute h-full w-full">
        <ParticleBackground setLoaded={setLoaded} />
      </div>

      {loaded ? (
        <>
          {step === Step.Card && <Deck setStep={setStep} />}

          {step === Step.Form && (
            <>
              <div
                className="flex bg-black rounded-lg relative md:flex-row md:w-1/2 md:h-1/2 overflow-hidden bg-opacity-80 animate-fade-in-down
              h-full w-full
              flex-col
            "
              >
                <Form setStep={setStep} />
                <div
                  className="flex-auto bg-cover bg-center "
                  style={{
                    backgroundImage: `url("/proposal.jpg")`,
                  }}
                >
                  <div
                    className="h-full w-full bg-primary opacity-80 flex justify-center p-24 text-white font-nanum
                  hidden
                  md:block
                "
                  ></div>
                </div>
              </div>
            </>
          )}
          {step === Step.Success && (
            <div
              className="flex bg-black rounded-lg relative md:flex-row md:w-1/2 md:h-1/2 overflow-hidden bg-opacity-80 animate-fade-in-down
            h-full w-full
            flex-col
          "
            >
              <div className="flex-auto p-8 flex flex-col justify-center items-center">
                <h1 className="text-5xl text-white">Success!</h1>
                <p className="text-white text-center">
                  Thank you for registering. We can&apos;t wait to see you
                  there!
                </p>
              </div>
            </div>
          )}

          {step === Step.Rejected && (
            <div
              className="flex bg-black rounded-lg relative md:flex-row md:w-1/2 md:h-1/2 overflow-hidden bg-opacity-80 animate-fade-in-down
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
      ) : null}
    </main>
  );
}
