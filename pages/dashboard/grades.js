import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import Header from "../../components/Header";
import SubHeader from "../../components/SubHeader";
import GradeList from "../../components/GradeList";

const grades = () => {
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
    <div>
      {user ? (
        <div>
          <Header />
          <SubHeader username={user.name} />
          {user.type === "S" ? (
            <div>
              <h1 className="text-lg font-semibold m-3">Your Grades:</h1>
              <GradeList studentId={user.id} />
            </div>
          ) : (
            <h1 className="text-lg font-semibold m-3">Access Denied</h1>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default grades;
