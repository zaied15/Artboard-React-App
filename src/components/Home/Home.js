import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleAuth = (destination) => {
    navigate(`/${destination}`);
  };

  return (
    <section>
      <div className="w-1/2 mx-auto mt-32 bg-teal-200 text-center p-3 rounded">
        <h1 className="text-3xl font-bold mb-5">Welcome To Drawing App</h1>

        <button
          onClick={() => handleAuth("login")}
          className="btn btn-warning mr-5"
        >
          Sign In
        </button>
        <button onClick={() => handleAuth("register")} className="btn">
          Sign UP
        </button>
      </div>
    </section>
  );
};

export default Home;
