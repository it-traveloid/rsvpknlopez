"use client";
import { useRef } from "react";
import TinderCard from "react-tinder-card";

const Card = () => {
  const ref = useRef(null);
  const onSwipe = (direction: any) => {
    console.log("You swiped: " + direction);
  };

  const onCardLeftScreen = (myIdentifier: any) => {
    console.log(myIdentifier + " left the screen");
  };

  return (
    <>
      <TinderCard
        key={"fooBar"}
        className="swipe"
        ref={ref}
        onSwipe={onSwipe}
        flickOnSwipe={true}
        preventSwipe={["up", "down"]}
        onCardLeftScreen={() => onCardLeftScreen("fooBar")}
      >
        <div
          className="relative w-[24rem] h-[40rem] bg-cover bg-center rounded-lg shadow-xl"
          style={{
            backgroundImage: `url("/savethedate.png")`,
          }}
        ></div>
      </TinderCard>
    </>
  );
};

export default Card;
