import React from "react";

const QuestionPaper = ({ question }) => {
  const questions = JSON.parse(question.questions);
  const fullMarks = questions.marks.reduce(
    (accumulator, num) => accumulator + num,
    0
  );
  return (
    <div>
      <div className="border-b border-gray-900">
        <h1 className="mt-3">{question.subjectName}</h1>
        <h1>({question.subjectCode})</h1>
        <div className="flex justify-around">
          <h1>Time: {question.time}mins</h1>
          <h1>Full Marks: {fullMarks}</h1>
        </div>
      </div>
      <div className="text-lg m-3 mx-10">
        {questions.questions.map((q, i) => {
          return (
            <div className="flex justify-between" key={i}>
              <h1 className="m-2 text-left">{q}</h1>
              <h1 className="m-2 text-right">
                {questions.marks[i] !== 0 ? `[${questions.marks[i]}]` : null}
              </h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionPaper;
