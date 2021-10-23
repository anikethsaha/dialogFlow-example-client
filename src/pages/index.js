import * as React from "react";
import { useRef, useState } from "react";
import { motion, AnimateSharedLayout } from "framer-motion";
import axios from "axios";
import Loader from "react-loader-spinner";
import toast, { Toaster } from "react-hot-toast";

const IndexPage = () => {
  const inputRef = useRef();
  const [dataRes, setDataRes] = useState(null);
  const [loading, setLoadingState] = useState(false);
  const [isDefaultIntent, setDefaultIntent] = useState(false);

  async function handleClick() {
    setLoadingState(true);
    const val = inputRef.current.value;
    if (val) {
      try {
        const result = await axios({
          method: "POST",
          url: "https://shielded-citadel-24658.herokuapp.com/df",
          data: {
            query: val,
          },
        });
        const { data } = result;
        await setDataRes(data);
        await setDefaultIntent(dataRes.intent === "Default Fallback Intent");
        setLoadingState(false);
      } catch (error) {
        toast.error(error.toString());
        setLoadingState(false);
      }
    } else {
      toast.error("Please Enter a value");
      setLoadingState(false);
    }
  }

  return (
    <div className="container m-auto">
      <div className="flex flex-col items-center justify-center h-screen  m-auto w-5/12">
        <h1 className="mb-8 leading-extra text-5xl text-start font-extrabold text-gray-600">
          DialogeFlow Example
        </h1>
        <div className="mt-1 relative rounded flex w-full  max-w-md ">
          <input
            type="text"
            name="price"
            ref={inputRef}
            id="price"
            className="w-full  block pl-7 pr-12 sm:text-sm border-gray-300 rounded-md p-2 border"
            placeholder="type something here"
          />
          <button
            onClick={handleClick}
            className="mx-2  hover:bg-gray-300 text-sm rounded hover:text-gray-600 text-gray-500 bg-gray-200 p-1 shadow-sm my-1 px-4"
          >
            Enter
          </button>
        </div>
        <div className="container w-11/12  my-8 flex flex-col items-center justify-center ">
          {loading ? (
            <Loader type="Oval" color="#663399" height={40} width={40} />
          ) : (
            <></>
          )}
          {dataRes && !loading ? (
            <motion.div
              animate={{
                y: 0,
              }}
              initial={{
                y: -100,
              }}
              className={`m-4 shadow-sm  w-full p-2 text-gray-600 rounded ${
                isDefaultIntent ? "bg-red-400" : "bg-gray-100"
              } px-6`}
            >
              <p
                className={`${
                  !isDefaultIntent ? `text-gray-600` : "text-white"
                } text-lg`}
              >
                {dataRes.fulfillmentText}
              </p>

              <p
                className={`${
                  !isDefaultIntent ? `text-gray-600` : "text-white"
                } text-sm`}
              >
                {dataRes.intent}
              </p>
            </motion.div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

// markup
// const IndexPage = () => {
//   return (
//     <main style={pageStyles}>
//       <title>Home Page</title>
//       <h1 style={headingStyles}>
//         Congratulations
//         <br />
//         <span style={headingAccentStyles}>— you just made a Gatsby site! </span>
//         <span role="img" aria-label="Party popper emojis">
//           🎉🎉🎉
//         </span>
//       </h1>
//       <p style={paragraphStyles}>
//         Edit <code style={codeStyles}>src/pages/index.js</code> to see this page
//         update in real-time.{" "}
//         <span role="img" aria-label="Sunglasses smiley emoji">
//           😎
//         </span>
//       </p>
//       <ul style={listStyles}>
//         <li style={docLinkStyle}>
//           <a
//             style={linkStyle}
//             href={`${docLink.url}?utm_source=starter&utm_medium=start-page&utm_campaign=minimal-starter`}
//           >
//             {docLink.text}
//           </a>
//         </li>
//       </ul>
//     </main>
//   );
// };

export default IndexPage;
