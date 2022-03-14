import React, { useState } from "react";
import { Input } from "../../components";
import { useApp } from "../../context/app.context";

const Login = () => {
  const { setAuth } = useApp();
  const [formVal, setFormVal] = useState({
    email: "test@vroom.com.au",
    password: "frontendtest2022",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (key: string, value: string) => {
    setFormVal({
      ...formVal,
      [key]: value,
    });
    setErrorMsg("");
  };

  const handleSubmit = () => {
    if (
      formVal.email === "test@vroom.com.au" &&
      formVal.password === "frontendtest2022"
    ) {
      setAuth({
        isAuth: true,
        user: formVal,
      });
    } else {
      setErrorMsg("Invalid Username & Password!");
    }
  };

  return (
    <div className="absolute w-full h-full">
      <div className="w-full h-full flex justify-center items-start	mt-16">
        <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex flex-col items-center space-x-4">
          <div>
            <h3 className="text-3xl text-gray-500 text-center uppercase">
              Sign In
            </h3>
            <Input
              labelClass="capitalize text-gray-500"
              inputClass="border rounded border-gray-300 p-4 w-full outline-none"
              wrapClass="my-2"
              label="email"
              type="text"
              value={formVal.email}
              onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
                handleChange("email", evt.target.value)
              }
            />
            <Input
              labelClass="capitalize text-gray-500"
              inputClass="border rounded border-gray-300 p-4 w-full outline-none"
              wrapClass="my-2"
              label="password"
              type="password"
              value={formVal.password}
              onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
                handleChange("password", evt.target.value)
              }
            />
          </div>
          <p className="text-red-500">{errorMsg}</p>
          <div className="my-2">
            <button
              className="shadow-sm px-5 py-3 bg-green-200 rounded text-gray-500	"
              onClick={handleSubmit}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
