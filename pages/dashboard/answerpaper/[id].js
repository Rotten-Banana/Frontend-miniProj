import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";

import Header from "../../../components/Header";
import QuestionPaper from "../../../components/QuestionPaper";

const id = () => {
  const [user, setuser] = useState();
  const [Question, setQuestion] = useState();
  const [timer, settimer] = useState();
  const [isActive, setisActive] = useState(false);
  const router = useRouter();
  const { id, userId } = router.query;
  axios.defaults.withCredentials = true;

  const getPaper = async () => {
    const paperResponse = await axios.post(
      "http://localhost:4000/question/getbyid",
      {
        paperId: id,
      }
    );
    if (paperResponse.data.id) {
      setQuestion(paperResponse.data);
      settimer(paperResponse.data.time);
    }
  };

  const startExamHandler = () => {
    getPaper();
    toogleIsActive();
  };

  const toogleIsActive = () => {
    setisActive(!isActive);
  };
  useEffect(async () => {
    const res = await axios.get("http://localhost:4000/me");
    res.data.id ? setuser(res.data) : router.push("/");
  }, []);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        settimer((timer) => timer - 1);
      }, 1000);
    } else if (!isActive && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timer]);

  console.log("user", user);
  console.log("userId", userId);
  console.log("paperId", id);
  console.log("Paper", Question);
  console.log("Timer", timer);
  return (
    <div>
      {user ? (
        user.id === Number(userId) ? (
          <div className="bg-gray-300 min-h-screen">
            <Header />
            <div className="text-center">
              <h1>{timer}</h1>
              {Question ? <QuestionPaper question={Question} /> : null}
            </div>
            {!isActive ? (
              <button
                onClick={startExamHandler}
                className="bg-green-500 p-2 px-5 m-2"
              >
                Start Exam
              </button>
            ) : (
              <button
                onClick={toogleIsActive}
                className="bg-green-500 p-2 px-5 m-2"
              >
                Stop
              </button>
            )}
          </div>
        ) : (
          <div className="bg-blue-500 min-h-screen flex flex-col justify-center">
            <h1 className="text-center font-black text-5xl">
              Error 401
              <br /> Unautorized Route
            </h1>
          </div>
        )
      ) : null}
    </div>
  );
};

export default id;
