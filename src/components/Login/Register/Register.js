import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const [passError, setPassError] = useState("");
  const navigate = useNavigate();

  if (loading) {
    return <p>Loading...</p>;
  }
  if (user) {
    return navigate("/drawing");
  }

  const onSubmit = (data) => {
    const name = data.name;
    const email = data.mail;
    const password = data.password;
    const confirmPassword = data.confirmPassword;
    if (password === confirmPassword) {
      setPassError("");
      createUserWithEmailAndPassword(email, password);
      reset();
    } else {
      setPassError("Password does not matched!");
    }
  };

  return (
    <section>
      <div className="w-1/4 mx-auto mt-32 bg-teal-100 text-center p-3 rounded">
        <h2 className="text-2xl font-bold mb-3">Register Drawing App</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex-col">
          <input
            type="text"
            placeholder="Your Name"
            className="input input-bordered w-full max-w-xs"
            {...register("name", { required: true })}
          />
          {errors.name && <p className="text-error">Name is required</p>}
          <input
            placeholder="Your Email"
            type="email"
            className="input input-bordered w-full max-w-xs mt-2"
            {...register("mail", { required: "Email Address is required" })}
          />
          {errors.mail && <p className="text-error">{errors.mail?.message}</p>}

          <input
            placeholder="Password"
            type="password"
            className="input input-bordered w-full max-w-xs mt-2"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className="text-error">Password is required</p>
          )}

          <input
            placeholder="Confirm Password"
            type="password"
            className="input input-bordered w-full max-w-xs mt-2"
            {...register("confirmPassword", { required: true })}
          />
          {errors.confirmPassword && (
            <p className="text-error">Confirm Password is required</p>
          )}
          {passError ? <p className="text-error">{passError}</p> : ""}
          {error ? <p className="text-error">{error.message}</p> : ""}
          <br />
          <button type="submit" className="btn mt-3 w-full max-w-xs">
            Register
          </button>
        </form>
        <p className="mt-3">
          Already Have an account?{" "}
          <Link to="/login" className="btn btn-xs btn-secondary">
            Please Login
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

export default Register;
