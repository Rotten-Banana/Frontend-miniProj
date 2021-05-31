import React, { useEffect, useState } from "react";

import Header from "../../components/Header";
import SubHeader from "../../components/SubHeader";
import CreatePaper from "../../components/CreatePaper";
import { useRouter } from "next/router";
import axios from "axios";

const createpaper = () => {
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
          {user.type === "T" ? (
            <CreatePaper />
          ) : (
            <div>
              <h1>Not a Teacher</h1>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default createpaper;
