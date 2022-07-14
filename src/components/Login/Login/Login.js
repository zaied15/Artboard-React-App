import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const navigate = useNavigate();

  if (loading) {
    return <p>Loading...</p>;
  }
  if (user) {
    return navigate("/drawing");
  }

  const onSubmit = (data) => {
    const email = data.mail;
    const password = data.password;
    signInWithEmailAndPassword(email, password);
  };
  return (
    <section>
      <div className="w-1/4 mx-auto mt-32 bg-teal-100 text-center p-3 rounded">
        <h2 className="text-2xl font-bold mb-3">Login Drawing App</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex-col">
          <input
            placeholder="Your Email"
            type="email"
            className="input input-bordered w-full max-w-xs mt-2"
            {...register("mail", { required: "Email Address is required" })}
          />
          <p className="text-error">{errors.mail?.message}</p>
          <input
            placeholder="Password"
            type="password"
            className="input input-bordered w-full max-w-xs mt-2"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className="text-error">Password is required</p>
          )}
          <br />
          <button type="submit" className="btn mt-3 w-full max-w-xs">
            Login
          </button>
        </form>
        <p className="mt-3">
          Are you new to here?{" "}
          <Link to="/register" className="btn btn-xs btn-secondary">
            Register
          </Link>
        </p>
      </div>
      <div className="w-1/4 mx-auto text-right pl-3 pt-3 pb-3 pr-0 rounded">
        <Link to="/" className="underline">
          Go to home
        </Link>
      </div>
    </section>
  );
};

export default Login;
