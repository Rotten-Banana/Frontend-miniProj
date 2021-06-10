import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Formik, Form, Field, ErrorMessage } from "formik";

const LoginForm = () => {
  const router = useRouter();
  let error = null;
  axios.defaults.withCredentials = true;
  return (
    <div className="">
      <Formik
        initialValues={{ id: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.id) errors.id = "Required";
          if (!values.password) errors.password = "Required";
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(async () => {
            try {
              const response = await axios.post("http://localhost:4000/login", {
                type_id: values.id,
                password: values.password,
              });

              if (response.data === "logged in") {
                router.push("/dashboard");
              } else {
                error = response.data;
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
            </div>
            <button
              className="bg-green-500 p-2 w-1/3 m-2"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </button>
            <h1>{error}</h1>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
