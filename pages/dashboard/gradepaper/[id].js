import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import Header from "../../../components/Header";
import SubHeader from "../../../components/SubHeader";

const id = () => {
  const [user, setuser] = useState();
  const router = useRouter();
  const { id } = router.query;
  axios.defaults.withCredentials = true;
  useEffect(async () => {
    const res = await axios.get("http://localhost:4000/me");
    res.data.id ? setuser(res.data) : router.push("/");
  }, []);
  return (
    <div>
      {user && id ? (
        <div>
          <Header />
          <SubHeader username={user.name} />
          {id}
        </div>
      ) : null}
    </div>
  );
};

export default id;
