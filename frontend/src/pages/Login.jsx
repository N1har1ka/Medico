import React, { useState } from "react";

const Login = () => {
  const [state, setState] = useState("Sign up");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setpassword] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <form className="min-h-[80vh] flex items-center " action="">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "Sign up" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {state === "Sign up" ? "sign up" : "login"} to book appointment
        </p>
        {state === "Sign up" ? (
          <div className="w-full">
            <p>Full Name</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        ) : (
          ""
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-zinc-300 roundedl w-full p-2 mt-1"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>
        <button className="bg-primary text-white w-full py-2 rounded-md text-base ">
          {state === "Sign up" ? "Create Account" : "Login"}
        </button>
        {state === "Sign up" ? (
          <p>
            Already have an account?{" "}
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => setState("Login")}
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account?{" "}
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => setState("Sign up")}
            >
              Click here
            </span>{" "}
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
