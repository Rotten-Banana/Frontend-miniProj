import React from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import { useState } from "react";

const CreatePaper = () => {
  const [totalMarks, settotalMarks] = useState(0);
  const [Question, setQuestion] = useState([""]);
  const [marks, setmarks] = useState([""]);
  axios.defaults.withCredentials = true;
  let questionObject = "";
  let questions = "";
  let error = null;
  let success = null;

  const calculateTotal = () => {
    const total = marks.reduce((accumulator, num) => accumulator + num, 0);
    settotalMarks(total);
  };

  const addQustionAndMarks = () => {
    setQuestion([...Question, ""]);
    setmarks([...marks, ""]);
    const total = marks.reduce((accumulator, num) => accumulator + num, 0);
    settotalMarks(total);
  };

  const handleQuestionChange = (e, index) => {
    const newArr1 = [...Question];
    newArr1[index] = e.target.value;
    setQuestion(newArr1);
  };

  const handleMarksChange = (e, index) => {
    const newArr2 = [...marks];
    newArr2[index] = isNaN(Number(e.target.value))
      ? ""
      : Number(e.target.value);
    setmarks(newArr2);
  };
  // console.log(marks);
  // console.log(Question);
  return (
    <div className="w-2/3">
      <Formik
        initialValues={{
          subjectCode: "",
          subjectName: "",
          time: "",
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(async () => {
            try {
              questionObject = {
                questions: Question,
                marks: marks,
              };

              const data = {
                subjectCode: values.subjectCode,
                subjectName: values.subjectName,
                time: Number(values.time),
                questions: JSON.stringify(questionObject),
              };
              const response = await axios.post(
                "http://localhost:4000/teacher/createpaper",
                data
              );
              console.log(response.data);
              if (response.data === "question paper added") {
                resetForm();
                success = "Question Successfuly added";
              } else {
                error = response.data;
              }
            } catch (err) {}

            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="flex flex-col">
              <div className="flex">
                <div className="m-2 w-full">
                  <Field
                    className="p-1 w-full"
                    type="subjectCode"
                    name="subjectCode"
                    placeholder="Subject Code"
                  />
                </div>
                <div className="m-2 w-full">
                  <Field
                    className="p-1 w-full"
                    type="subjectName"
                    name="subjectName"
                    placeholder="Subject Name"
                  />
                </div>
                <div className="m-2 w-full">
                  <Field
                    className="p-1 w-full"
                    name="time"
                    placeholder="Time(as minutes)"
                  />
                </div>
              </div>
              <h1 className="m-2">Total Marks: {totalMarks}</h1>
              <div className="m-2">
                {Question.map((question, index) => {
                  return (
                    <div className="flex my-2" key={index}>
                      <Field
                        id="question"
                        className="p-1 w-full"
                        as="textarea"
                        placeholder="Write Questions"
                        value={question}
                        onChange={(e) => handleQuestionChange(e, index)}
                      />
                      <Field
                        id="marks"
                        className="p-1 m-1 h-10"
                        placeholder="Marks"
                        value={marks[index]}
                        onChange={(e) => handleMarksChange(e, index)}
                      />
                    </div>
                  );
                })}
                <div className="flex">
                  <button
                    className="bg-green-500 p-2 px-4 w-auto"
                    type="button"
                    onClick={addQustionAndMarks}
                  >
                    Add Question
                  </button>
                  <button
                    className="bg-green-500 p-2 px-4 w-auto mx-2"
                    type="button"
                    onClick={calculateTotal}
                  >
                    Calculate Total
                  </button>
                </div>
              </div>
            </div>
            <button
              className="bg-green-500 p-2 w-1/3 m-2"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </button>
            <div className="text-lg m-3">
              {questions.questions
                ? questions.questions.map((q, i) => {
                    return (
                      <div className="flex" key={i}>
                        <h1 className="m-2">{q}</h1>
                        <h1 className="m-2">[{questions.marks[i]}]</h1>
                      </div>
                    );
                  })
                : null}
              <h1>{success ? success : error}</h1>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreatePaper;
