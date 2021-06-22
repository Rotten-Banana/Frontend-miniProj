import { useRouter } from "next/router";
import React from "react";

import Papers from "./Papers";

const TeacherDash = () => {
  const router = useRouter();

  const createPaperHandler = () => {
    router.push("/dashboard/createpaper");
  };

  const gradePaperHandler = () => {
    router.push("/dashboard/gradepaper");
  };

  const deletePaperHandler = () => {
    router.push("/dashboard/deletepaper");
  };
  return (
    <div>
      <div className="flex">
        <button
          className="mx-5 flex flex-col items-center"
          onClick={createPaperHandler}
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
          <h1>Create Paper</h1>
        </button>
        <button
          className="mx-5 flex flex-col items-center"
          onClick={gradePaperHandler}
        >
          <div className="bg-green-500 p-3.5 px-4 w-auto">
            <h1 className="font-bold text-lg">A+</h1>
          </div>
          <h1>Grade Paper</h1>
        </button>
        <button
          className="mx-5 flex flex-col items-center"
          onClick={deletePaperHandler}
        >
          <div className="bg-green-500 p-4 w-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h1>Delete Paper</h1>
        </button>
      </div>
      <div className="my-10">
        <h1 className="text-lg font-semibold m-3">Question Papers:</h1>
        <Papers user={{ type: "S" }} />
      </div>
    </div>
  );
};

export default TeacherDash;
