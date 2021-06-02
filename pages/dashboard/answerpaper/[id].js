import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";

import Header from "../../../components/Header";
import QuestionPaper from "../../../components/QuestionPaper";

import "react-quill/dist/quill.snow.css";
import { useQuill } from "react-quilljs";

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["image"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: true,
  },
  imageCompress: {
    quality: 0.7, // default
    maxWidth: 500, // default
    maxHeight: 500, // default
    imageType: "image/jpeg", // default
    debug: true, // default
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "image",
];

const theme = "snow";
const placeholder = "write something epic";

const id = () => {
  const [user, setuser] = useState();
  const [Question, setQuestion] = useState();
  const [timer, settimer] = useState();
  const [isActive, setisActive] = useState(false);
  const router = useRouter();
  const { id, userId } = router.query;
  axios.defaults.withCredentials = true;

  const { quill, quillRef, Quill } = useQuill({
    theme,
    modules,
    formats,
    placeholder,
  });

  if (Quill && !quill) {
    // For execute this line only once.
    const ImageCompress = require("quill-image-compress").default;
    Quill.register("modules/imageCompress", ImageCompress);
  }

  const getPaper = async () => {
    const paperResponse = await axios.post(
      "http://localhost:4000/question/getbyid",
      {
        paperId: id,
      }
    );
    if (paperResponse.data.id) {
      setQuestion(paperResponse.data);
      settimer(paperResponse.data.time);
    }
  };

  const startExamHandler = () => {
    getPaper();
    toogleIsActive();
  };

  const toogleIsActive = () => {
    setisActive(!isActive);
  };
  useEffect(async () => {
    const res = await axios.get("http://localhost:4000/me");
    res.data.id ? setuser(res.data) : router.push("/");
  }, []);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        settimer((timer) => timer - 1);
      }, 1000);
    } else if (!isActive && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timer]);

  if (isActive && timer === 0) {
    toogleIsActive();
    settimer(Question.time);
    const delta = quill.getContents();
    console.log(delta);
    console.log("time over");
  }

  return (
    <div className="bg-gray-300 min-h-screen">
      <Header />

      {user ? (
        user.id === Number(userId) ? (
          <div>
            <div
              className={
                !isActive
                  ? "hidden"
                  : "text-center my-2 w-3/4 bg-gray-100 border-2 mx-auto border-gray-900"
              }
            >
              {timer ? (
                <h1 className="my-3">Time Remaining: {timer}mins</h1>
              ) : null}
              {Question ? <QuestionPaper question={Question} /> : null}
            </div>
            <div className="flex">
              {!isActive ? (
                <div className="my-3 mx-auto flex flex-col w-3/4">
                  <h1 className="my-3 text-center font-semibold">
                    After clicking Start the exam will commence and the time
                    will start the paper will be submitted once the time is over
                    or if you choose to submit manually. Good Luck
                  </h1>
                  <button
                    onClick={startExamHandler}
                    className="bg-green-500 p-2 px-5 w-1/4 mx-auto"
                  >
                    Start Exam
                  </button>
                </div>
              ) : (
                <button
                  onClick={toogleIsActive}
                  className="bg-green-500 p-2 px-5 m-2"
                >
                  Stop
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-blue-500 min-h-screen flex flex-col justify-center">
            <h1 className="text-center font-black text-5xl">
              Error 401
              <br /> Unautorized Route
            </h1>
          </div>
        )
      ) : null}
      <div className={!isActive ? "hidden" : "w-10/12 mx-auto"}>
        <div ref={quillRef} />
      </div>
    </div>
  );
};

export default id;
