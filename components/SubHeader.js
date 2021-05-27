import React from "react";
import axios from "axios";
import { useRouter } from "next/router";

const SubHeader = ({ username }) => {
  const router = useRouter();
  axios.defaults.withCredentials = true;
  const logoutHandler = async () => {
    if (username) {
      const response = await axios.post("http://localhost:4000/logout");
      if (response.data === "session destroyed successfuly") {
        router.push("/");
      }
    }
  };

  return (
    <div className="flex justify-between">
      <h1 className="text-lg font-semibold m-3">Welcome {username}</h1>
      <button
        className="bg-green-500 p-2 px-5 m-2 flex items-center"
        onClick={logoutHandler}
      >
        <p>Logout</p>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </button>
    </div>
  );
};

export default SubHeader;
