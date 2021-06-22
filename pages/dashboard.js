import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import Header from "../components/Header";
import SubHeader from "../components/SubHeader";
import TeacherDash from "../components/TeacherDash";
import StudentDash from "../components/StudentDash";

const dashboard = () => {
  const [user, setuser] = useState();
  const router = useRouter();
  axios.defaults.withCredentials = true;
  useEffect(async () => {
    const res = await axios.get(
      "https://internal-examination.herokuapp.com/me"
    );
    res.data.id ? setuser(res.data) : router.push("/");
  }, []);
  return (
    <div className="bg-gray-300 min-h-screen">
      {user ? (
        <div>
          <Header />
          <SubHeader username={user.name} />
          {user.type === "T" ? <TeacherDash /> : <StudentDash />}
        </div>
      ) : null}
    </div>
  );
};

export default dashboard;
