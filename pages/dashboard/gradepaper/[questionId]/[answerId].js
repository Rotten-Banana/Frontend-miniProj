import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import Header from "../../../../components/Header";
import SubHeader from "../../../../components/SubHeader";

const answerId = () => {
  const [user, setuser] = useState();
  const router = useRouter();
  const { questionId, answerId } = router.query;
  axios.defaults.withCredentials = true;
  useEffect(async () => {
    const res = await axios.get("http://localhost:4000/me");
    res.data.id ? setuser(res.data) : router.push("/");
  }, []);
  return (
    <div>
      {user && answerId ? (
        <div>
          <Header />
          <SubHeader username={user.name} />
          {user.type === "T" ? (
            <h1>
              AnswerId: {answerId} QuestionId: {questionId}
            </h1>
          ) : (
            <h1 className="text-lg font-semibold m-3">Access Denied</h1>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default answerId;
