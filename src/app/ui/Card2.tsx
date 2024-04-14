import React, { Dispatch, SetStateAction, useState } from "react";
import { useSpring, animated, to } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import "./index.css";
import { Step } from "@/types";

//  These two are just helpers, they curate spring data, values that are later being interpolated into css
const final = () => ({
  x: 0,
  scale: 1,
  // rot: -10 + Math.random() * 20,
  delay: 100,
});
const from = () => ({ x: 0, rot: 0, scale: 1.5, y: 0 });
// This is being used down there in the view, it interpolates rotation and scale into a css transform

function Deck({ setStep }: { setStep: Dispatch<SetStateAction<Step>> }) {
  const [gone] = useState(() => new Set()); // The set flags all the cards that are flicked out
  const [props, api] = useSpring(() => ({ from: from() })); // Create a bunch of springs using the helpers above
  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity

  const determineDirCard = (x: any) => {
    if (x > 0) {
      setStep(Step.Form);
    } else {
      setStep(Step.Rejected);
    }
  };

  const bind = useDrag(
    ({ args, down, movement, direction: [xDir], velocity }) => {
      const [xDelta] = movement;
      const trigger = velocity[0] > 0.25; // If you flick hard enough it should trigger the card to fly out
      // check if the card is far right or far left use window.innerWidth
      const outOfBounds = Math.abs(xDelta) > (window.innerWidth * 1) / 3;

      const dir = xDir < 0 ? -1 : 1; // Direction should either point left or right
      if ((!down && trigger) || (!down && outOfBounds)) gone.add(args[0]); // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
      const isGone = gone.has(args[0]);
      api.start({
        to: {
          x: isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0, // When a card is gone it flys out left or right, otherwise goes back to zero
          rot: xDelta / 50 + (isGone ? dir * 10 * velocity[0] : 0), // How much the card tilt
          scale: down ? 1.1 : 1, // Active cards lift up a bit
        },
        config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
      });

      if (!isGone && !down) setTimeout(() => api.start(() => final()), 200);
      if (isGone) {
        determineDirCard(xDelta);
      }
    },
    {
      filterTaps: true,
    }
  );

  return (
    <div id="card-container">
      <animated.div
        style={{
          transform: to([props.x, props.rot, props.scale], (x, y, z) => {
            return `translate(${x}px, 0) rotate(${y}deg) scale(${z})`;
          }),
        }}
      >
        {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
        <animated.div
          {...bind("card")}
          style={{
            backgroundImage: `url(${"/savethedate.png"})`,
          }}
        >
          <animated.svg
            className="tinder-icon  reject"
            style={{
              transform: to(
                [props.x],
                (x) =>
                  `translate3d(${-x / 5}px, 0, 0) scale(${
                    x > -140 ? x / -80 : 1.6
                  })`
              ),
              opacity: to([props.x], (x) => `${x / -80} `),
            }}
            viewBox="0 0 96 96"
          >
            <g
              style={{
                stroke: "none",
                strokeWidth: 0,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeMiterlimit: 10,
                fill: "none",
                fillRule: "nonzero",
                opacity: 1,
              }}
              transform="translate(1.4065934065934016 1.4065934065934016) scale(1 1)"
            >
              <path
                d="M 45 90 C 20.187 90 0 69.813 0 45 C 0 20.187 20.187 0 45 0 c 24.813 0 45 20.187 45 45 C 90 69.813 69.813 90 45 90 z M 45 7 C 24.047 7 7 24.047 7 45 s 17.047 38 38 38 s 38 -17.047 38 -38 S 65.953 7 45 7 z"
                style={{
                  stroke: "none",
                  strokeWidth: 1,
                  strokeDasharray: "none",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeMiterlimit: 10,
                  fill: "#e91e63",
                  fillRule: "nonzero",
                  opacity: 1,
                }}
                transform=" matrix(1 0 0 1 0 0) "
                strokeLinecap="round"
              />
              <circle
                cx="30.85"
                cy="33.68"
                r="7"
                style={{
                  stroke: "none",
                  strokeWidth: 1,
                  strokeDasharray: "none",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeMiterlimit: 10,
                  fill: "#e91e63",
                  fillRule: "nonzero",
                  opacity: 1,
                }}
                transform="  matrix(1 0 0 1 0 0) "
              />
              <circle
                cx="59.15"
                cy="33.68"
                r="7"
                style={{
                  stroke: "none",
                  strokeWidth: 1,
                  strokeDasharray: "none",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeMiterlimit: 10,
                  fill: "#e91e63",
                  fillRule: "nonzero",
                  opacity: 1,
                }}
                transform="  matrix(1 0 0 1 0 0) "
              />
              <path
                d="M 61.691 65.942 c -0.778 0 -1.563 -0.259 -2.212 -0.789 c -4.136 -3.379 -9.143 -5.165 -14.479 -5.165 s -10.344 1.786 -14.479 5.164 c -1.496 1.224 -3.702 1.002 -4.925 -0.495 s -1.001 -3.702 0.496 -4.925 c 5.322 -4.35 12.038 -6.744 18.908 -6.744 s 13.585 2.395 18.907 6.743 c 1.497 1.224 1.72 3.429 0.497 4.925 C 63.712 65.504 62.706 65.942 61.691 65.942 z"
                style={{
                  stroke: "none",
                  strokeWidth: 1,
                  strokeDasharray: "none",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeMiterlimit: 10,
                  fill: "#e91e63",
                  fillRule: "nonzero",
                  opacity: 1,
                }}
                transform=" matrix(1 0 0 1 0 0) "
                strokeLinecap="round"
              />
            </g>
            {/* <path d="M19.716 69.213C17.763 71.165 17.763 74.331 19.716 76.284C21.668 78.237 24.834 78.237 26.787 76.284L48.000 55.071L69.213 76.284C71.166 78.237 74.332 78.237 76.284 76.284C78.237 74.332 78.237 71.166 76.284 69.213L55.071 48.000L76.284 26.787C78.237 24.834 78.237 21.668 76.284 19.715C74.332 17.763 71.166 17.763 69.213 19.715L48.000 40.929L26.787 19.716C24.834 17.763 21.668 17.763 19.716 19.716C17.763 21.668 17.763 24.834 19.716 26.787L40.929 48.000L19.716 69.213Z"></path> */}
          </animated.svg>
          <animated.svg
            className="tinder-icon interest"
            style={{
              transform: to(
                [props.x],
                (x) =>
                  `translate3d(${-x / 5}px, 0, 0) scale(${
                    x < 140 ? x / 80 : 1.6
                  })`
              ),
              opacity: to([props.x], (x) => `${x / 80} `),
            }}
            viewBox="0 0 96 96"
          >
            <path d="M68.661 15.923C59.769 15.923 53.384 20.706 48.445 29.217C48.248 29.556 47.752 29.556 47.555 29.217C42.616 20.706 36.231 15.923 27.339 15.923C15.597 15.923 6 25.858 6 38.165C6 59.802 35.672 79.763 45.136 85.580C46.905 86.667 49.095 86.667 50.864 85.580C60.328 79.766 90 59.819 90 38.278C90 25.858 80.403 15.923 68.661 15.923Z"></path>
          </animated.svg>
        </animated.div>
      </animated.div>
    </div>
  );
}

export default Deck;
