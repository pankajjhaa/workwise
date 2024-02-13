import React from "react";
import RegisterForm from "../../../components/auth/register-form";

const RegisterPage = () => {
    return (<>
        <div className={"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-[80%] lg:w-[30%]"}>
            <div>
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Welcome
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Enter your details below to register
                    </p>
                </div>

                <RegisterForm/>
            </div>
        </div>
    </>)
}

export default RegisterPage;
