import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import Header from "../../../components/Header";
import SubHeader from "../../../components/SubHeader";
import AnswerList from "../../../components/AnswerList";

const questionId = () => {
  const [user, setuser] = useState();
  const router = useRouter();
  const { questionId } = router.query;
  axios.defaults.withCredentials = true;
  useEffect(async () => {
    const res = await axios.get(
      "https://internal-examination.herokuapp.com/me"
    );
    res.data.id ? setuser(res.data) : router.push("/");
  }, []);
  return (
    <div>
      {user && questionId ? (
        <div>
          <Header />
          <SubHeader username={user.name} />
          {user.type === "T" ? (
            <div>
              <h1 className="text-lg font-semibold m-3">Answer Papers:</h1>
              <AnswerList questionId={questionId} user={user} />
            </div>
          ) : (
            <h1 className="text-lg font-semibold m-3">Access Denied</h1>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default questionId;
