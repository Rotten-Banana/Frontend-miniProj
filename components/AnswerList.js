import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const AnswerList = ({ questionId, user }) => {
  const [answers, setanswers] = useState();
  const router = useRouter();
  axios.defaults.withCredentials = true;
  useEffect(async () => {
    const res = await axios.post(
      "http://localhost:4000/answer/getbyquestionid",
      {
        questionId,
      }
    );
    setanswers(res.data);
  }, []);

  const questionHandler = (id) => {
    if (user.type === "T") {
      router.push(`/dashboard/gradepaper/${questionId}/${id}`);
    }
  };
  return (
    <div>
      {answers ? (
        answers.length !== 0 ? (
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
                    Student Name
                  </th>
                  <th className="p-2 bg-blue-400 border-l-2 border-r-2 border-blue-500">
                    Student Id
                  </th>
                  <th className="p-2 bg-blue-400 border-l-2 border-r-2 border-blue-500">
                    Grade Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {answers
                  ? answers.map((answer, index) => {
                      return (
                        <tr
                          onClick={() => questionHandler(answer.id)}
                          key={index}
                        >
                          <td
                            className={
                              index % 2 !== 0
                                ? "p-2 border-l-2 border-r-2 border-blue-500 bg-blue-300"
                                : "p-2 border-l-2 border-r-2 border-blue-500"
                            }
                          >
                            {answer.subjectCode}
                          </td>
                          <td
                            className={
                              index % 2 !== 0
                                ? "p-2 border-l-2 border-r-2 border-blue-500 bg-blue-300"
                                : "p-2 border-l-2 border-r-2 border-blue-500"
                            }
                          >
                            {answer.subjectName}
                          </td>
                          <td
                            className={
                              index % 2 !== 0
                                ? "p-2 border-l-2 border-r-2 border-blue-500 bg-blue-300"
                                : "p-2 border-l-2 border-r-2 border-blue-500"
                            }
                          >
                            {answer.userName}
                          </td>
                          <td
                            className={
                              index % 2 !== 0
                                ? "p-2 border-l-2 border-r-2 border-blue-500 bg-blue-300"
                                : "p-2 border-l-2 border-r-2 border-blue-500"
                            }
                          >
                            {answer.userTypeId}
                          </td>
                          <td
                            className={
                              index % 2 !== 0
                                ? "p-2 border-l-2 border-r-2 border-blue-500 bg-blue-300"
                                : "p-2 border-l-2 border-r-2 border-blue-500"
                            }
                          >
                            {answer.marks ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-green-600 items-center"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-red-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  : null}
              </tbody>
            </table>
          </div>
        ) : (
          <h1 className="mx-5 text-semibold text-lg">
            No Answers are Submitted yet.
          </h1>
        )
      ) : null}
    </div>
  );
};

export default AnswerList;
