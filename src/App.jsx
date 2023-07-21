import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Wheel from "./components/Wheel/Wheel";
import useUrlState from "@ahooksjs/use-url-state";

// const items = [
//   {
//     text: "10% Off Sticker Price",
//     color: "hsl(197 30% 43%)",
//     reaction: "dancing",
//   },
//   {
//     text: "Free Car",
//     color: "hsl(173 58% 39%)",
//     reaction: "shocked",
//   },
//   {
//     text: "No Money Down",
//     color: "hsl(43 74% 66%)",
//     reaction: "shocked",
//   },
//   {
//     text: "Half Off Sticker Price",
//     color: "hsl(27 87% 67%)",
//     reaction: "shocked",
//   },
//   {
//     text: "Free DIY Carwash",
//     color: "hsl(12 76% 61%)",
//     reaction: "dancing",
//   },
//   {
//     text: "Eternal Peace",
//     color: "hsl(350 60% 52%)",
//     reaction: "laughing",
//   },
//   {
//     text: "Used Travel Mug",
//     color: "hsl(91 43% 54%)",
//     reaction: "laughing",
//   },
//   {
//     text: "One Solid Hug",
//     color: "hsl(140 36% 74%)",
//     reaction: "dancing",
//   },
// ];

function App() {
  const [names, setNames] = useState("");
  const [urlState, setUrlState] = useUrlState(
    {
      names: [""],
    },
    {
      parseOptions: {
        arrayFormat: "comma",
      },
      stringifyOptions: {
        arrayFormat: "comma",
      },
    }
  );

  useEffect(() => {
    let input = "";

    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    if (params.names) input = params.names.split(",").join("\n");

    setNames(input);
  }, []);

  const handleChange = (event) => {
    const names = event.target.value;
    setNames(names);

    const prevUrl = [];

    const words = names.split("\n");

    for (let i = 0; i < words.length; i++) prevUrl[i] = words[i];

    setUrlState({ names: prevUrl });
  };

  return (
    <div className="flex justify-between">
      <Routes>
        <Route path="/" element={<Wheel />} />
      </Routes>
      <div className="bg-white shadow-md rounded px-8 pt-10 pb-8 mb-4 ml-5">
        <div className="relative mb-3" data-te-input-wrapper-init>
          <textarea
            id="Textarea1"
            name="Textarea1"
            className="peer block min-h-[auto] border border-gray-400 w-full rounded  bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            rows="11"
            placeholder="Item..."
            onChange={handleChange}
            value={names}
          ></textarea>
          {!names && (
            <label
              htmlFor="Textarea1"
              className="pointer-events-none absolute left-3 top-0  mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.5rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
            >
              Enter Items...
            </label>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
