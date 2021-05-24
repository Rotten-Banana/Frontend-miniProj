import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const StudentSignup = () => {
  return (
    <div>
      <Formik
        initialValues={{
          fullname: "",
          email: "",
          password: "",
          id: "",
          rollno: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.fullname) errors.fullname = "Required";
          if (!values.email) errors.email = "Required";
          if (!values.password) errors.password = "Required";
          if (!values.id) {
            errors.id = "Required";
          } else {
            if (!values.id.includes("S")) {
              errors.id = "Invalid Id";
            }
          }
          if (!values.rollno) errors.rollno = "Required";
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log(values);
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
                    placeholder="College-Id"
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
                    type="rollno"
                    name="rollno"
                    placeholder="Roll no"
                  />
                  <ErrorMessage
                    className="text-red-400 text-sm"
                    name="rollno"
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
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default StudentSignup;
