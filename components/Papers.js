import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Papers = ({ user }) => {
  const [questions, setquestions] = useState();
  const router = useRouter();
  axios.defaults.withCredentials = true;
  useEffect(async () => {
    if (user.type === "S") {
      const res = await axios.get(
        "https://internal-examination.herokuapp.com/questions/getall"
      );
      setquestions(res.data);
    } else if (user.type === "T") {
      const res = await axios.post(
        "https://internal-examination.herokuapp.com/question/getbyuserid",
        { teacherId: user.id }
      );
      setquestions(res.data);
    }
  }, []);

  const questionHandler = (e, id) => {
    if (router.pathname === "/dashboard/gradepaper") {
      if (user.type === "S" && user.id && e.target.tagName === "TD") {
        router.push(`/dashboard/answerpaper/${id}?userId=${user.id}`);
      } else if (user.type === "T" && e.target.tagName === "TD") {
        router.push(`/dashboard/gradepaper/${id}`);
      }
    }
  };

  const deleteHandler = async (id) => {
    if (user.type === "T") {
      const res = await axios.post(
        "https://internal-examination.herokuapp.com/question/deletebyid",
        { paperId: id }
      );
      console.log(res.data);
      if (res.data === "deleted") {
        router.reload();
      }
    }
  };
  return (
    <div>
      {questions ? (
        questions.length !== 0 ? (
          <div>
            <table className="cursor-pointer w-2/3 mx-5 p-3 table-auto border-collapse border-none border-blue-500">
              <thead>
                <tr>
                  <th className="p- bg-blue-400 border-l-2 border-r-2 border-blue-500">
                    Subject Code
                  </th>
                  <th className="p-2 bg-blue-400 border-l-2 border-r-2 border-blue-500">
                    Subject Name
                  </th>
                  <th className="p-2 bg-blue-400 border-l-2 border-r-2 border-blue-500">
                    Paper Setter
                  </th>
                  <th className="p-2 bg-blue-400 border-l-2 border-r-2 border-blue-500">
                    Time(min)
                  </th>
                </tr>
              </thead>
              <tbody>
                {questions
                  ? questions.map((question, index) => {
                      return (
                        <tr
                          onClick={(e) => questionHandler(e, question.id)}
                          key={index}
                        >
                          <td
                            className={
                              index % 2 !== 0
                                ? "p-2 border-l-2 border-r-2 border-blue-500 bg-blue-300"
                                : "p-2 border-l-2 border-r-2 border-blue-500"
                            }
                          >
                            {question.subjectCode}
                          </td>
                          <td
                            className={
                              index % 2 !== 0
                                ? "p-2 border-l-2 border-r-2 border-blue-500 bg-blue-300"
                                : "p-2 border-l-2 border-r-2 border-blue-500"
                            }
                          >
                            {question.subjectName}
                          </td>
                          <td
                            className={
                              index % 2 !== 0
                                ? "p-2 border-l-2 border-r-2 border-blue-500 bg-blue-300"
                                : "p-2 border-l-2 border-r-2 border-blue-500"
                            }
                          >
                            {question.teacherName}
                          </td>
                          <td
                            className={
                              index % 2 !== 0
                                ? "p-2 border-l-2 border-r-2 border-blue-500 bg-blue-300"
                                : "p-2 border-l-2 border-r-2 border-blue-500"
                            }
                          >
                            {question.time}
                          </td>
                          {router.pathname === "/dashboard/deletepaper" &&
                          user.type === "T" ? (
                            <td>
                              <button
                                onClick={() => deleteHandler(question.id)}
                                className="mx-3"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5 text-red-600"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                            </td>
                          ) : null}
                        </tr>
                      );
                    })
                  : null}
              </tbody>
            </table>
          </div>
        ) : (
          <h1 className="mx-5 text-semibold text-lg">
            You did not set any question paper. Set one first.
          </h1>
        )
      ) : null}
    </div>
  );
};

export default Papers;
