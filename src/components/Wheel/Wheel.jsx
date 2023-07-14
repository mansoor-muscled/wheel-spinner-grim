import React, { useState, useRef } from "react";

import Reaper from "./Reaper";
import "./Wheel.scss";

const MySlice = ({ slice }) => {
  const [prize, setPrize] = useState("");
  const [selectedPrize, setSelectedPrize] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const [currentReaction, setCurrentReaction] = useState("resting");

  const currentSlice = useRef();
  const rotation = useRef();
  const buttonRef = useRef();

  const spinnerRef = useRef();
  const tickerRef = useRef();
  const spinnerStyles = useRef();
  let tickerAnim;

  const prizeOffset = Math.floor(180 / slice.length);

  // size of prize
  const prizeSlice = 360 / slice.length;

  const spinertia = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handleButtonClick = () => {
    setCurrentReaction("resting");
    buttonRef.current.disabled = true;
    rotation.current = Math.random() * 360 + spinertia(2000, 5000);
    setSelectedPrize(null);
    setSpinning(true);

    tickerRef.current.style.animation = "none";
    spinnerStyles.current = window.getComputedStyle(spinnerRef.current);
    runTickerAnimation();
  };

  const runTickerAnimation = () => {
    // https://css-tricks.com/get-value-of-css-rotation-through-javascript/

    if (spinnerStyles.current.transform === "none") return;
    const values = spinnerStyles.current.transform
      .split("(")[1]
      .split(")")[0]
      .split(",");

    const a = values[0];
    const b = values[1];
    let rad = Math.atan2(b, a);

    if (rad < 0) rad += 2 * Math.PI;

    const angle = Math.round(rad * (180 / Math.PI));
    const slice = Math.floor(angle / prizeSlice);

    if (currentSlice.current !== slice) {
      tickerRef.current.style.animation = "none";
      setTimeout(() => (tickerRef.current.style.animation = null), 10);
      currentSlice.current = slice;
    }

    tickerAnim = requestAnimationFrame(runTickerAnimation);
  };

  const handleTransitionEnd = () => {
    tickerAnim = null;
    buttonRef.current.disabled = false;
    buttonRef.current.focus();
    rotation.current %= 360;
    selectPrize();
    setSpinning(false);
  };

  const selectPrize = () => {
    const selected = Math.floor(rotation.current / prizeSlice);
    setSelectedPrize(selected);
    setCurrentReaction(slice[selected].reaction);
  };

  return (
    <section className="relative flex flex-col items-center justify-center py-24 bg-gray-50">
      <h2 className="mb-8 text-6xl font-medium text-center text-red-800 font-display">
        The Spinning Wheel
      </h2>

      {/* <p className="max-w-2xl mx-auto text-xl text-center mb-14">L</p> */}

      <div className={`deal-wheel ${spinning ? "is-spinning" : ""}`}>
        <ul
          className="spinner"
          onTransitionEnd={handleTransitionEnd}
          ref={spinnerRef}
          style={{
            "--rotate": rotation.current || 0,
            background: `conic-gradient(from -90deg, ${slice
              .map(
                ({ color }, i) =>
                  `${color} 0 ${(100 / slice.length) * (slice.length - i)}%`
              )
              .reverse()}`,
          }}
        >
          {slice.map(({ text, color, reaction }, i) => {
            const rot = prizeSlice * i * -1 - prizeOffset;

            return (
              <li
                key={text + i}
                className={`prize ${selectedPrize === i ? "selected" : ""}`}
                data-reaction={reaction}
                style={{ "--rotate": rot + "deg" }}
              >
                <span className="text">{text}</span>
              </li>
            );
          })}
        </ul>
        <figure className="cap">
          <Reaper reaction={currentReaction} />
        </figure>
        <div className="ticker" ref={tickerRef}></div>
        <button
          ref={buttonRef}
          onClick={handleButtonClick}
          className="btn-spin"
        >
          Spin That Wheel!
        </button>
      </div>
    </section>
  );
};

export default MySlice;
