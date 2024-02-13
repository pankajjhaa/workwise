import React from "react";
import LoginForm from "../../../components/auth/login-form";

const LoginPage = () => {
  return (<>
    <div className={"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-[80%] lg:w-[30%]"}>
      <div>
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email & password below to login
            </p>
          </div>

        <LoginForm/>
      </div>
    </div>
  </>)
}

export default LoginPage;
