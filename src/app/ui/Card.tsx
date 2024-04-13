"use client";
import { Dispatch, SetStateAction, useRef } from "react";
import TinderCard from "react-tinder-card";
import { Step } from "../../types";

const Card = ({ setStep }: { setStep: Dispatch<SetStateAction<Step>> }) => {
  const ref = useRef(null);
  const onSwipe = (direction: any) => {
    if (direction === "right") {
      // add delay to allow animation to finish
      setTimeout(() => {
        setStep(Step.Form);
      }, 200);
    } else {
      // add delay to allow animation to finish
      setTimeout(() => {
        setStep(Step.Rejected);
      }, 200);
    }
  };

  return (
    <>
      <TinderCard
        key={"fooBar"}
        className="swipe w-full h-full md:w-auto md:h-auto"
        ref={ref}
        onSwipe={onSwipe}
        flickOnSwipe={true}
        preventSwipe={["up", "down"]}
      >
        <div
          className="relative md:w-[24rem] md:h-[40rem] bg-cover bg-center rounded-lg shadow-xl
           sm:w-[20rem] sm:h-[32rem]  
          w-full h-full
          "
          style={{
            backgroundImage: `url("/savethedate.png")`,
          }}
        ></div>
      </TinderCard>
    </>
  );
};

export default Card;
