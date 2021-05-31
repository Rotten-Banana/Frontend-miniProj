import { useRouter } from "next/router";
import React from "react";

const Header = () => {
  const router = useRouter();

  const homeRouter = () => {
    router.push("/dashboard");
  };
  return (
    <div className="bg-blue-600 w-full p-10">
      <h1 onClick={homeRouter} className="text-xl font-bold cursor-pointer">
        Exam Portal
      </h1>
    </div>
  );
};

export default Header;
