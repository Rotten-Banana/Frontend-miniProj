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
    ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
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
    quality: 0.7,
    maxWidth: 500,
    maxHeight: 500,
    imageType: "image/jpeg",
    debug: true,
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "bullet",
  "indent",
  "image",
  "code-block",
];

const theme = "snow";
const placeholder = "write something epic";

const id = () => {
  const [Msg, setMsg] = useState(
    "After clicking Start the exam will commence and the time will start the paper will be submitted once the time is over or if you choose to submit manually. Good Luck."
  );
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

  const startExamHandler = async () => {
    const response = await axios.post(
      "http://localhost:4000/validate/eligibility",
      {
        paperId: id,
      }
    );
    if (response.data === "eligible") {
      getPaper();
      toogleIsActive();
    } else {
      setMsg("You cannot give the same exam twice.");
    }
  };

  const toogleIsActive = () => {
    setisActive(!isActive);
  };

  const sendAnswer = async (answer) => {
    const respose = await axios.post("http://localhost:4000/answer/insert", {
      paperId: id,
      subCode: Question.subjectCode,
      subName: Question.subjectName,
      answer: answer,
    });
    if (respose.data === "inserted") {
      setMsg("Answer is submitted");
    }
  };

  const submitHandler = () => {
    toogleIsActive();
    settimer(Question.time);
    const delta = quill.getContents();
    const stringAnswer = JSON.stringify(delta);
    sendAnswer(stringAnswer);
    setTimeout(() => {}, 3000);
    router.push("/dashboard/answerpaper");
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
      }, 1000 * 60);
    } else if (!isActive && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timer]);

  if (isActive && timer === 0) {
    submitHandler();
  }

  return (
    <div className="bg-gray-300 min-h-screen">
      <Header />

      {userId && user ? (
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
                  <h1 className="my-3 text-center font-semibold">{Msg}</h1>
                  <button
                    onClick={startExamHandler}
                    className="bg-green-500 p-2 px-5 w-1/4 mx-auto"
                  >
                    Start Exam
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="my-auto h-96 flex flex-col justify-center">
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
      <div className="my-3 mx-auto flex flex-col w-3/4 bg-gray-300">
        <button
          className={
            !isActive ? "hidden" : "bg-green-500 p-2 px-5 w-1/4 mx-auto"
          }
          onClick={submitHandler}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default id;
