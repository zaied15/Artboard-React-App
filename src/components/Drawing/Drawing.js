import React from "react";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useNavigate } from "react-router-dom";
import Canvas from "./Canvas";

const Drawing = () => {
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();
  return (
    <section>
      <div className="text-right px-3 py-1 bg-teal-100">
        <button
          onClick={() => {
            signOut(auth);
            navigate("/");
          }}
          className="btn btn-sm"
        >
          Logout
        </button>
      </div>
      <div className="ml-1">
        <Canvas></Canvas>
      </div>
    </section>
  );
};

export default Drawing;
