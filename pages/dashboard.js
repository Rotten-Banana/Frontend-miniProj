import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Header from "../components/Header";

const dashboard = () => {
  const [username, setusername] = useState();
  const router = useRouter();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get("http://localhost:4000/me").then((response) => {
      response.data.name ? setusername(response.data.name) : router.push("/");
    });
  });

  const logoutHandler = async () => {
    if (username) {
      const response = await axios.post("http://localhost:4000/logout");
      if (response.data === "session destroyed successfuly") {
        router.push("/");
      }
    }
  };

  return (
    <div className="bg-gray-300 min-h-screen">
      <Header />
      <h1 className="text-lg font-semibold">Welcome {username}</h1>
      <button onClick={logoutHandler}>Logout</button>
    </div>
  );
};

export default dashboard;
