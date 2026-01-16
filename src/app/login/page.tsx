"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

enum MODE {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  RESET_PASSWORD = "RESET_PASSWORD",
  EMAIL_VERIFICATION = "EMAIL_VERIFICATION",
}

const LoginPage = () => {
  const router = useRouter();

  const [mode, setMode] = useState<MODE>(MODE.LOGIN);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const formTitle = mode === MODE.LOGIN ? "Log in" : "Register";
  const btnTitle = mode === MODE.LOGIN ? "Log in" : "Register";

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => setLoggedIn(d.loggedIn));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      const endpoint =
        mode === MODE.LOGIN ? "/api/auth/login" : "/api/auth/signup";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        setError(
          mode === MODE.LOGIN
            ? "Invalid email or password!"
            : "Email already exists or invalid data!"
        );
        setIsLoading(false);
        return;
      }

      if (mode === MODE.REGISTER) {
        setMessage("Account created. You can log in now.");
        setMode(MODE.LOGIN);
        setIsLoading(false);
        return;
      }

      setMessage("Successful! You are being redirected.");
      router.replace("/");
      router.refresh();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

    const handleLogOut = async () => {
      try {
        setIsLoading(true);

        await fetch("/api/auth/logout", {
          method: "POST",
        });

        
        setLoggedIn(false);

        router.refresh();
      } catch (e) {
        console.error("Logout failed", e);
      } finally {
        setIsLoading(false);
      }
    };

  return (
    <div className="h-[calc(100vh-400px)] mt-10 md:mt-0 py-4 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 3xl:px-[300px] flex items-center justify-center">
    {loggedIn ? (
          <div className="loggedin text-center">
            <p className="text-success-500 text-sm">You are logged in</p>
             <button
            disabled={isLoading} onClick={handleLogOut}
            className="bg-primary-500 mt-4 w-full text-white rounded-md p-1 disabled:bg-gray-300 disabled:cursor:not-allowed"
            >
              Log out
            </button>
          </div>
        ) : (
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <h1 className="font-bold text-primary-500 text-xl">
            {formTitle ? formTitle : "Form Title"}
          </h1>

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
              Don`t have an account?
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

          {!error && message && (
            <div className="text-success-500 text-sm">{message}</div>
          )}
        </form>
        )}
    </div>
  );
};

export default LoginPage;
