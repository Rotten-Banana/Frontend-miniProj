import React from "react";
import { useState } from "react";
import LoginForm from "../components/LoginForm";
import StudentSignup from "../components/StudentSignup";
import TeacherSignup from "../components/TeacherSignup";
import Header from "../components/Header";

const index = () => {
  const [FormState, setFormState] = useState("login");
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
