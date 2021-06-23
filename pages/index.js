import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import LoginForm from "../components/LoginForm";
import StudentSignup from "../components/StudentSignup";
import TeacherSignup from "../components/TeacherSignup";
import Header from "../components/Header";

const index = () => {
  const [FormState, setFormState] = useState("login");
  const router = useRouter();
  axios.defaults.withCredentials = true;
  useEffect(async () => {
    alert(
      "This site uses 3rd party cookies so to login allow restricted cookies or enable 3rd party cookies from your browser settings"
    );
    const res = await axios.get(
      "https://internal-examination.herokuapp.com/me"
    );
    res.data.id ? router.push("/dashboard") : null;
  }, []);
  let body = null;
  if (FormState === "login") {
    body = <LoginForm />;
  } else if (FormState === "student") {
    body = <StudentSignup />;
  } else if (FormState === "teacher") {
    body = <TeacherSignup />;
  }
  return (
    <div className="bg-gray-300 min-h-screen">
      <Header />
      <div className="m-5">
        <button
          className="bg-green-500 p-2 px-4 m-2"
          onClick={() => setFormState("login")}
        >
          <h2 className="font-semibold">Login</h2>
        </button>
        <button
          className="bg-green-500 p-2 px-4 m-2"
          onClick={() => setFormState("student")}
        >
          <h2 className="font-semibold">Student Signup</h2>
        </button>
        <button
          className="bg-green-500 p-2 px-4 m-2"
          onClick={() => setFormState("teacher")}
        >
          <h2 className="font-semibold">Teacher Signup</h2>
        </button>
        <div className="w-1/2">{body}</div>
      </div>
    </div>
  );
};

export default index;
