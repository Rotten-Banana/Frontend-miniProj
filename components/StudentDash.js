import { useRouter } from "next/router";
import React from "react";

const StudentDash = () => {
  const router = useRouter();

  const answerPaperHandler = () => {
    router.push("/dashboard/answerpaper");
  };

  const gradeHandler = () => {
    router.push("/dashboard/grades");
  };
  return (
    <div>
      <div className="flex">
        <button
          className="mx-5 flex flex-col items-center"
          onClick={answerPaperHandler}
        >
          <div className="bg-green-500 p-4 w-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
              <path
                fillRule="evenodd"
                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h1>Answer Paper</h1>
        </button>
        <button
          className="mx-5 flex flex-col items-center"
          onClick={gradeHandler}
        >
          <div className="bg-green-500 p-3.5 px-4 w-auto">
            <h1 className="font-bold text-lg">A+</h1>
          </div>
          <h1>Grades</h1>
        </button>
      </div>
    </div>
  );
};

export default StudentDash;
