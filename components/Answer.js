import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuill } from "react-quilljs";
import "react-quill/dist/quill.bubble.css";

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

const Answer = ({ answerId }) => {
  const [Answer, setAnswer] = useState();
  const { quill, quillRef, Quill } = useQuill({
    modules: { toolbar: false },
    formats,
    theme: "bubble",
    readOnly: true,
  });
  axios.defaults.withCredentials = true;
  useEffect(async () => {
    const res = await axios.post("http://localhost:4000/answer/getbyanswerid", {
      answerId,
    });
    res.data.id
      ? setAnswer(res.data)
      : alert("Something went wrong try reloading.");
  }, []);

  useEffect(() => {
    if (Answer && quill) {
      const ans = JSON.parse(Answer.answer);
      quill.setContents(ans);
    }
  }, [Answer, quill]);
  return (
    <div className="border-2 border-gray-900 m-2">
      {Answer ? (
        <div
          className="text-center font-semibold"
          style={{ backgroundColor: "aliceblue" }}
        >
          <h1>{Answer.subjectCode}</h1>
          <h1>{Answer.subjectName}</h1>
          <h1>{Answer.userName}</h1>
          <h1 className="border-b border-gray-900">{Answer.userTypeId}</h1>
          <h1 className="font-bold text-xl text-left mx-5 pt-2">Answers:</h1>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
      <div
        className={!Answer ? "hidden" : "p-4"}
        style={{ backgroundColor: "aliceblue" }}
        ref={quillRef}
      />
    </div>
  );
};

export default Answer;