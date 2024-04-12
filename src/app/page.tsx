"use client";
import { useState } from "react";
import Card from "./ui/Card";
import Form from "./ui/Form";

import ParticleBackground from "./ui/Particles";

export default function Home() {
  const [guest, setGuest] = useState("");
  const [loaded, setLoaded] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center w-screen overflow-hidden">
      <div className="absolute h-full w-full">
        <ParticleBackground setLoaded={setLoaded} />
      </div>
      {loaded ? (
        <>
          {guest ? (
            <h1 className="text-white mb-4 text-4xl z-10">Hi {guest}!</h1>
          ) : null}
          {!guest ? <Form setGuest={setGuest} /> : <Card />}
        </>
      ) : (
        <></>
      )}
    </main>
  );
}
