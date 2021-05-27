import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import CreatePaper from "../components/CreatePaper";
import Header from "../components/Header";
import SubHeader from "../components/SubHeader";

const dashboard = () => {
  const [data, setdata] = useState({
    id: 0,
    type: "",
    name: "",
  });
  const router = useRouter();
  axios.defaults.withCredentials = true;
  useEffect(async () => {
    const res = await axios.get("http://localhost:4000/me");
    res.data.id ? setdata(res.data) : router.push("/");
  }, []);
  return (
    <div className="bg-gray-300 min-h-screen">
      <Header />
      <SubHeader username={data.name} />
      {data.type === "T" ? <CreatePaper username={data.name} /> : null}
    </div>
  );
};

export default dashboard;