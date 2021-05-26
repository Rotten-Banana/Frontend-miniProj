import React from "react";
import CreatePaper from "../components/CreatePaper";
import Header from "../components/Header";
import SubHeader from "../components/SubHeader";

const dashboard = () => {
  return (
    <div className="bg-gray-300 min-h-screen">
      <Header />
      <SubHeader />
      <CreatePaper />
    </div>
  );
};

export default dashboard;
