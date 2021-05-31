import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import Header from "../../components/Header";
import SubHeader from "../../components/SubHeader";
import Papers from "../../components/Papers";

const answerpaper = () => {
  const [user, setuser] = useState();
  const router = useRouter();
  axios.defaults.withCredentials = true;
  useEffect(async () => {
    const res = await axios.get("http://localhost:4000/me");
    res.data.id ? setuser(res.data) : router.push("/");
  }, []);
  return (
    <div className="bg-gray-300 min-h-screen">
      {user ? (
        <div>
          <Header />
          <SubHeader username={user.name} />
          {user.type === "S" ? (
            <Papers user={user} />
          ) : (
            <div>
              <h1>Not a Student</h1>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default answerpaper;
