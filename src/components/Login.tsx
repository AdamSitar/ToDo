import { zodResolver } from "@hookform/resolvers/zod";
import { AuthError } from "@supabase/supabase-js";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../context/user";
import { loginSchema } from "../utils/schemas";
import ErrorBox from "./ErrorBox";

const Login = () => {
  const { signup, login, logout } = useUser();
  const [loginErr, setLoginErr] = useState<AuthError>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form className="flex flex-col items-center mb-4 gap-2">
      <div className="self-start w-full">
        <p>Log in, or sign up:</p>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <input
          placeholder="email"
          {...register("email", { required: true })}
          className="border p-1"
        />

        <input
          type="password"
          placeholder="password"
          {...register("password", { required: true })}
          className="border p-1"
        />

        <ErrorBox errors={errors} />
      </div>
      {loginErr && (
        <div>
          <p className="text-red-500">{loginErr.message}</p>
        </div>
      )}
      <div className="flex flex-row gap-2 w-full justify-center">
        <button
          className="rounded border grow"
          type="button"
          onClick={handleSubmit(async ({ email, password }) => {
            const err = await login(email, password);
            setLoginErr(err);
          })}
        >
          Login
        </button>
        <button
          className="rounded border grow"
          type="button"
          onClick={() => logout && logout()}
        >
          Logout
        </button>
        <button
          className="rounded border grow"
          type="button"
          onClick={handleSubmit(({ email, password }) =>
            signup(email, password)
          )}
        >
          Signup
        </button>
      </div>
    </form>
  );
};

export default Login;
