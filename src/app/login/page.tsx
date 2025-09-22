"use client";

import { useState } from "react";
import { useWixClient } from "../hooks/useWixClient";
import { LoginState } from "@wix/sdk";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";

enum MODE {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  RESET_PASSWORD = "RESET_PASSWORD",
  EMAIL_VERIFICATION = "EMAIL_VERIFICATION",
}

const LoginPage = () => {
  const wixClient = useWixClient();
  const isLoggedIn = wixClient.auth.loggedIn();

  console.log("logged in: " + isLoggedIn);

  const pathName = usePathname();
  const router = useRouter();

  if (isLoggedIn) {
    router.push("/");
  }

  const [mode, setMode] = useState(MODE.LOGIN);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const formTitle =
    mode === MODE.LOGIN
      ? "Log in"
      : mode === MODE.REGISTER
      ? "Register"
      : mode === MODE.RESET_PASSWORD
      ? "Reset your password"
      : "Verify your Email";

  const btnTitle =
    mode === MODE.LOGIN
      ? "Log in"
      : mode === MODE.REGISTER
      ? "Register"
      : mode === MODE.RESET_PASSWORD
      ? "Reset"
      : "Verify";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      let response;

      switch (mode) {
        case MODE.LOGIN:
          response = await wixClient.auth.login({
            email,
            password,
          });
          break;

        case MODE.REGISTER:
          response = await wixClient.auth.register({
            email,
            password,
            profile: { nickname: username },
          });
          break;

        case MODE.RESET_PASSWORD:
          response = await wixClient.auth.sendPasswordResetEmail(
            email,
            pathName
          );
          break;

        case MODE.EMAIL_VERIFICATION:
          response = await wixClient.auth.processVerification({
            verificationCode: emailCode,
          });

        default:
          setError("Something went wrong: unknown mode");
          setMessage("");
          setIsLoading(false);
          break;
      }

      console.log(response);

      switch (response?.loginState) {
        case LoginState.SUCCESS:
          setMessage("Successful! You are being redirected.");
          const tokens = await wixClient.auth.getMemberTokensForDirectLogin(
            response.data.sessionToken!
          );

          Cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), {
            expires: 2,
          });
          wixClient.auth.setTokens(tokens);

          break;
        case LoginState.FAILURE:
          if (
            response.errorCode === "invalidEmail" ||
            response.errorCode === "invalidPassword"
          ) {
            setError("Invalid password or email address!");
          } else if (response.errorCode === "emailAlreadyExists") {
            setError("Email already exists!");
          } else if (response.errorCode === "resetPassword") {
            setError("You need to reset password!");
          } else {
            setError("Something went wrong!");
          }

        default:
          break;
      }
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-400px)] mt-10 md:mt-0 py-4 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 3xl:px-[300px] flex items-center justify-center">
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <h1 className="font-bold text-primary-500 text-xl">
          {formTitle ? formTitle : "Form Title"}
        </h1>
        {mode == MODE.REGISTER ? (
          <div className="form-group flex flex-col gap-1">
            <label className="text-md text-gray-500" htmlFor="">
              Username
            </label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              name="username"
              placeholder="John"
              className="ring-2 ring-gray-300 rounded-md p-2"
            />
          </div>
        ) : null}

        {mode !== MODE.EMAIL_VERIFICATION ? (
          <div className="form-group flex flex-col gap-1">
            <label className="text-md text-gray-500" htmlFor="">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              placeholder="billy@gmail.com"
              className="ring-2 ring-gray-300 rounded-md p-2"
            />
          </div>
        ) : (
          <div className="form-group flex flex-col gap-1">
            <label className="text-md text-gray-500" htmlFor="">
              Verification Code
            </label>
            <input
              onChange={(e) => setEmailCode(e.target.value)}
              type="text"
              name="emailCode"
              placeholder="code"
              className="ring-2 ring-gray-300 rounded-md p-2"
            />
          </div>
        )}

        {mode === MODE.LOGIN || mode === MODE.REGISTER ? (
          <div className="form-group flex flex-col gap-1">
            <label className="text-md text-gray-500" htmlFor="">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              placeholder="password"
              className="ring-2 ring-gray-300 rounded-md p-2"
            />
          </div>
        ) : null}

        {mode === MODE.LOGIN && (
          <div
            className="underline text-primary-500 cursor-pointer text-xs"
            onClick={() => setMode(MODE.RESET_PASSWORD)}
          >
            Forgot password?
          </div>
        )}

        <button
          disabled={isLoading}
          className="bg-primary-500 mt-4 text-white rounded-md p-1 disabled:bg-gray-300 disabled:cursor:not-allowed"
        >
          {btnTitle}
        </button>
        {error && <div className="text-danger-500 font-semibold">{error}</div>}

        {mode === MODE.LOGIN && (
          <div
            className="underline text-primary-500 cursor-pointer text-xs"
            onClick={() => setMode(MODE.REGISTER)}
          >
            {"Don`t"} have an account?
          </div>
        )}

        {mode === MODE.REGISTER && (
          <div
            className="underline text-primary-500 cursor-pointer text-xs"
            onClick={() => setMode(MODE.LOGIN)}
          >
            Have an account?
          </div>
        )}

        {mode === MODE.RESET_PASSWORD && (
          <div
            className="underline text-primary-500 cursor-pointer text-xs"
            onClick={() => setMode(MODE.LOGIN)}
          >
            Go back to Login
          </div>
        )}

        {!error && message && (
          <div className="text-success-500 text-sm">{message}</div>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
