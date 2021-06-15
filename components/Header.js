import { useRouter } from "next/router";
import React from "react";

const Header = () => {
  const router = useRouter();

  const homeRouter = () => {
    router.push("/dashboard");
  };
  return (
    <div className="bg-blue-600 w-full p-8">
      <div onClick={homeRouter} className="flex items-center">
        <div className="cursor-pointer">
          <img
            src="https://stcet.org/static/assets/img/logo.png"
            alt="STCET"
            height="70"
            width="70"
          />
        </div>
        <div className="mx-4">
          <h1 className="text-xl font-bold cursor-pointer">
            {`St. Thomas' College of Engineering & Technology`}
          </h1>
          <h1>4, Diamond Harbour Road, Kidderpore, Kolkata - 700023</h1>
          <h1 className="font-bold cursor-pointer">
            Internal Examination Portal
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
