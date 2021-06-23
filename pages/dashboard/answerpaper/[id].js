import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";

import Header from "../../../components/Header";

import dynamic from "next/dynamic";

const AnswerPaper = dynamic(() => import("../../../components/AnswerPaper"), {
  ssr: false,
  loading: () => <h1>Loading...</h1>,
});

// const modules = {
//   toolbar: [
//     [{ header: "1" }, { header: "2" }, { font: [] }],
//     ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
//     [, { indent: "-1" }, { indent: "+1" }],
//     ["image"],
//     ["clean"],
//   ],
//   clipboard: {
//     matchVisual: true,
//   },
//   imageCompress: {
//     quality: 0.7,
//     maxWidth: 500,
//     maxHeight: 500,
//     imageType: "image/jpeg",
//     debug: true,
//   },
// };

// const formats = [
//   "header",
//   "font",
//   "size",
//   "bold",
//   "italic",
//   "underline",
//   "strike",
//   "blockquote",
//   "indent",
//   "image",
//   "code-block",
// ];

// const theme = "snow";
// const placeholder = "write something epic";

const id = () => {
  // const [Msg, setMsg] = useState(
  //   "After clicking Start the exam will commence and the time will start the paper will be submitted once the time is over or if you choose to submit manually. Good Luck."
  // );
  const [user, setuser] = useState();
  // const [Question, setQuestion] = useState();
  // const [timer, settimer] = useState();
  // const [isActive, setisActive] = useState(false);
  // const router = useRouter();
  const { id, userId } = router.query;
  // axios.defaults.withCredentials = true;

  // const { quill, quillRef, Quill } = useQuill({
  //   theme,
  //   modules,
  //   formats,
  //   placeholder,
  // });

  // if (Quill && !quill) {
  //   // For execute this line only once.
  //   const ImageCompress = require("quill-image-compress").default;
  //   Quill.register("modules/imageCompress", ImageCompress);
  // }

  // const getPaper = async () => {
  //   const paperResponse = await axios.post(
  //     "https://internal-examination.herokuapp.com/question/getbyid",
  //     {
  //       paperId: id,
  //     }
  //   );
  //   if (paperResponse.data.id) {
  //     setQuestion(paperResponse.data);
  //     settimer(paperResponse.data.time);
  //   }
  // };

  // const startExamHandler = async () => {
  //   const response = await axios.post(
  //     "https://internal-examination.herokuapp.com/validate/eligibility",
  //     {
  //       paperId: id,
  //     }
  //   );
  //   if (response.data === "eligible") {
  //     getPaper();
  //     toogleIsActive();
  //   } else {
  //     setMsg("You cannot give the same exam twice.");
  //   }
  // };

  // const toogleIsActive = () => {
  //   setisActive(!isActive);
  // };

  // const sendAnswer = async (answer) => {
  //   const response = await axios.post(
  //     "https://internal-examination.herokuapp.com/answer/insert",
  //     {
  //       paperId: id,
  //       subCode: Question.subjectCode,
  //       subName: Question.subjectName,
  //       answer: answer,
  //     }
  //   );
  //   console.log(response.data);
  //   if (response.data === "inserted") {
  //     setMsg("Answer is submitted");
  //   }
  // };

  // const submitHandler = () => {
  //   toogleIsActive();
  //   settimer(Question.time);
  //   const delta = quill.getContents();
  //   const stringAnswer = JSON.stringify(delta);
  //   sendAnswer(stringAnswer);
  //   setTimeout(() => {}, 3000);
  //   router.push("/dashboard/answerpaper");
  // };

  useEffect(async () => {
    const res = await axios.get(
      "https://internal-examination.herokuapp.com/me"
    );
    res.data.id ? setuser(res.data) : router.push("/");
  }, []);

  // useEffect(() => {
  //   let interval = null;
  //   if (isActive) {
  //     interval = setInterval(() => {
  //       settimer((timer) => timer - 1);
  //     }, 1000 * 60);
  //   } else if (!isActive && timer !== 0) {
  //     clearInterval(interval);
  //   }
  //   return () => clearInterval(interval);
  // }, [isActive, timer]);

  // if (isActive && timer === 0) {
  //   submitHandler();
  // }

  return (
    <div className="bg-gray-300 min-h-screen">
      <Header />

      {userId && user ? <AnswerPaper userId={userId} user={user} /> : null}
    </div>
  );
};

export default id;
