import React from "react";
import { Formik, Form, Field } from "formik";

import Timer from "./Timer";

const CreatePaper = ({ username }) => {
  console.log(username);
  let text = "";
  return (
    <div className="w-2/3">
      <Formik
        initialValues={{
          subjectCode: "",
          subjectName: "",
          time: "",
          questions: "",
        }}
        // validate={(values) => {
        //   const errors = {};
        //   if (!values.id) errors.id = "Required";
        //   if (!values.password) errors.password = "Required";
        //   return errors;
        // }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(async () => {
            text =
              "<h1>" + values.questions.replaceAll("\n", "<br />") + "</h1>";

            const data = {
              name: username,
              subjectCode: values.subjectCode,
              subjectName: values.subjectName,
              time: Number(values.time),
              questions: text,
            };
            console.log(data);
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
              <div className="m-2">
                <Field
                  className="p-1 w-full"
                  type="questions"
                  name="questions"
                  as="textarea"
                  placeholder="Write Questions"
                />
              </div>
            </div>
            <button
              className="bg-green-500 p-2 w-1/3 m-2"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </button>
            <div
              className="text-lg m-3"
              dangerouslySetInnerHTML={{ __html: text }}
            />
          </Form>
        )}
      </Formik>
      <Timer />
    </div>
  );
};

export default CreatePaper;
