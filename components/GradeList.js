import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const GradeList = ({ studentId }) => {
  const [answers, setanswers] = useState();
  const router = useRouter();
  axios.defaults.withCredentials = true;
  useEffect(async () => {
    const res = await axios.post(
      "https://internal-examination.herokuapp.com/answer/getbystudentid",
      {
        studentId,
      }
    );
    setanswers(res.data);
  }, []);

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
                    Grade
                  </th>
                </tr>
              </thead>
              <tbody>
                {answers
                  ? answers.map((answer, index) => {
                      return (
                        <tr key={index}>
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
                              <h1>{answer.marks}</h1>
                            ) : (
                              <h1>Not Checked</h1>
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

export default GradeList;
