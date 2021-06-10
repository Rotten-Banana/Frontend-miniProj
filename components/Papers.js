import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Papers = ({ user }) => {
  const [questions, setquestions] = useState();
  const router = useRouter();
  axios.defaults.withCredentials = true;
  useEffect(async () => {
    if (user.type === "S") {
      const res = await axios.get("http://localhost:4000/questions/getall");
      setquestions(res.data);
    } else if (user.type === "T") {
      const res = await axios.post(
        "http://localhost:4000/question/getbyuserid",
        { teacherId: user.id }
      );
      setquestions(res.data);
    }
  }, []);

  const questionHandler = (id) => {
    if (user.type === "S") {
      router.push(`/dashboard/answerpaper/${id}?userId=${user.id}`);
    } else if (user.type === "T") {
      router.push(`/dashboard/gradepaper/${id}`);
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
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {questions
                  ? questions.map((question, index) => {
                      return (
                        <tr
                          onClick={() => questionHandler(question.id)}
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
