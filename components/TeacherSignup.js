import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Formik, Form, Field, ErrorMessage } from "formik";

const TeacherSignup = () => {
  axios.defaults.withCredentials = true;
  let error = null;
  let success = null;
  const router = useRouter();
  return (
    <div>
      <Formik
        initialValues={{
          fullname: "",
          email: "",
          password: "",
          id: "",
          institutekey: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.fullname) errors.fullname = "Required";
          if (!values.email) errors.email = "Required";
          if (!values.password) errors.password = "Required";
          if (!values.id) {
            errors.id = "Required";
          } else {
            if (!values.id.includes("T")) {
              errors.id = "Invalid Id";
            }
          }
          if (!values.institutekey) errors.institutekey = "Required";
          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(async () => {
            console.log(values);
            try {
              const flag = await axios.post(
                "https://internal-examination.herokuapp.com/validate/institutekey",
                {
                  key: values.institutekey,
                }
              );
              if (flag.data === "valid") {
                const response = await axios.post(
                  "https://internal-examination.herokuapp.com/signup/teacher",
                  {
                    type_id: values.id,
                    password: values.password,
                    email: values.email,
                    full_name: values.fullname,
                    type: "T",
                  }
                );
                console.log(response.data);

                if (response.data === "inserted") {
                  resetForm();
                  success = "User Registered. Try Logging in";
                } else {
                  error = response.data;
                }
              } else {
                error = "Invalid Institute Key";
              }
            } catch (err) {
              console.log(err);
            }
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="flex flex-col">
              <div className="m-2">
                <Field
                  className="p-1 w-full"
                  type="fullname"
                  name="fullname"
                  placeholder="Fullname"
                />
                <ErrorMessage
                  className="text-red-400 text-sm"
                  name="fullname"
                  component="div"
                />
              </div>
              <div className="m-2">
                <Field
                  className="p-1 w-full"
                  type="email"
                  name="email"
                  placeholder="Email"
                />
                <ErrorMessage
                  className="text-red-400 text-sm"
                  name="email"
                  component="div"
                />
              </div>
              <div className="m-2">
                <Field
                  className="p-1 w-full"
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                <ErrorMessage
                  className="text-red-400 text-sm"
                  name="password"
                  component="div"
                />
              </div>
              <div className="flex">
                <div className="m-2 w-full">
                  <Field
                    className="p-1 w-full"
                    type="id"
                    name="id"
                    placeholder="Teacher-Id"
                  />
                  <ErrorMessage
                    className="text-red-400 text-sm"
                    name="id"
                    component="div"
                  />
                </div>
                <div className="m-2 w-full">
                  <Field
                    className="p-1 w-full"
                    type="institutekey"
                    name="institutekey"
                    placeholder="Institute Key"
                  />
                  <ErrorMessage
                    className="text-red-400 text-sm"
                    name="institutekey"
                    component="div"
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
              <h1>{success ? success : error}</h1>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TeacherSignup;
