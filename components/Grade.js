import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Grade = ({ questionId, answerId }) => {
  const router = useRouter();
  const [Marks, setMarks] = useState();
  const [givenMarks, setGivenMarks] = useState([]);
  const [total, setTotal] = useState(0);
  axios.defaults.withCredentials = true;
  useEffect(async () => {
    const res = await axios.post(
      "https://internal-examination.herokuapp.com/question/getbyid",
      {
        paperId: questionId,
      }
    );
    res.data.id
      ? setMarks(JSON.parse(res.data.questions).marks)
      : alert("Something went wrong try reloading.");
  }, []);

  const handleMarksChangeOnBlur = () => {
    const t = givenMarks.reduce((accumulator, num) => {
      return num === undefined ? accumulator : accumulator + num;
    }, 0);
    setTotal(t);
  };

  const handleMarksChangeOnChange = (e, index, marks) => {
    const newArr = [...givenMarks];
    newArr[index] = isNaN(Number(e.target.value))
      ? alert("Must be a Number")
      : Number(e.target.value);
    newArr[index] <= marks
      ? setGivenMarks(newArr)
      : alert("Must be within Given marks");
  };

  const submitMarksHandler = async () => {
    const res = await axios.post(
      "https://internal-examination.herokuapp.com/answer/updatemarks",
      {
        marks: total,
        id: answerId,
      }
    );
    res.data === "marks updated" ? router.back() : null;
  };

  let count1 = 0;
  let count2 = 0;
  return (
    <div className="w-auto p-2 px-4 m-2 text-center bg-blue-500 border-2 border-gray-900">
      <h1 className="text-lg font-semibold m-3">Marks</h1>
      {Marks ? (
        <div>
          {Marks.map((marks, index) => {
            if (marks === 0) {
              count1++;
              count2 = 0;
              return (
                <h1 className="text-left" key={index}>
                  {"(" + count1 + ")"}
                </h1>
              );
            } else {
              count2++;
              return (
                <div key={index} className="flex m-4">
                  <h1 className="mx-2">
                    {count1 === 0 ? null : `${count1}.`}
                    {count2}
                    {") "}
                  </h1>
                  <input
                    className="p-1 mx-2 h-7 w-12"
                    onBlur={(e) => handleMarksChangeOnBlur()}
                    onChange={(e) => handleMarksChangeOnChange(e, index, marks)}
                  />
                  <h1 className="mx-1">/{marks}</h1>
                </div>
              );
            }
          })}
          <h1 className="text-lg font-semibold m-3">Total Marks: {total}</h1>
          <button
            className="p-1 px-2 m-2 font-semibold border-2 border-gray-900 shadow-xl"
            onClick={submitMarksHandler}
          >
            Submit Marks
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Grade;
