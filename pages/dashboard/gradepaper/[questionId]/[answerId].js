import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import Header from "../../../../components/Header";
import SubHeader from "../../../../components/SubHeader";
import Answer from "../../../../components/Answer";
import Grade from "../../../../components/Grade";
import QuestionPaper from "../../../../components/QuestionPaper";

import dynamic from "next/dynamic";

// const Answer = dynamic(() => import("../../../../components/Answer"), {
//   ssr: false,
//   loading: () => <h1>Loading...</h1>,
// });

const answerId = () => {
  const [user, setuser] = useState();
  const [questionState, setQuestionState] = useState(false);
  const [question, setQuestion] = useState();
  const router = useRouter();
  const { questionId, answerId } = router.query;
  axios.defaults.withCredentials = true;
  useEffect(async () => {
    const res = await axios.get(
      "https://internal-examination.herokuapp.com/me"
    );
    res.data.id ? setuser(res.data) : router.push("/");
  }, []);

  const toggleQuestion = () => {
    setQuestionState(!questionState);
    question ? null : getPaper();
  };

  const getPaper = async () => {
    const paperResponse = await axios.post(
      "https://internal-examination.herokuapp.com/question/getbyid",
      {
        paperId: questionId,
      }
    );
    if (paperResponse.data.id) {
      setQuestion(paperResponse.data);
    }
  };

  return (
    <div>
      {user && answerId ? (
        <div>
          <Header />
          <SubHeader username={user.name} />

          {user.type === "T" ? (
            <div className="flex justify-between">
              <Answer answerId={answerId} />
              {question ? (
                <div className={questionState ? "w-3/4" : null}>
                  <div
                    className={
                      questionState
                        ? "text-center sticky top-4 my-2 bg-gray-100 border-2 mx-auto border-gray-900"
                        : "hidden"
                    }
                  >
                    <QuestionPaper question={question} />
                  </div>
                </div>
              ) : null}
              <div>
                <div className="sticky top-4">
                  <Grade questionId={questionId} answerId={answerId} />
                  <div className="sticky">
                    <button
                      onClick={toggleQuestion}
                      className="bg-blue-500 rounded-full p-2 m-2 flex items-center focus:outline-none focus:ring-2 focus:ring-gray-900"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <h1 className="mx-2">View Questions</h1>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <h1 className="text-lg font-semibold m-3">Access Denied</h1>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default answerId;
