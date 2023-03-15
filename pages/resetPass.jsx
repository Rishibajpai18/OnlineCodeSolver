import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { sendPasswordResetEmail  } from "firebase/auth";
import BaseContext from "../context/ContextCreator";
import { auth } from "../firebase";
import Loader from "../component/loader";

const ResetPass = () => {
  const context = useContext(BaseContext);
  const { user, setToast } = context;
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState("");
  const [emailerror, setEmailerror] = useState("");
  
  const [loginState, setLoginState] = useState(false);

  const changePassType = () => {
    if (passstatus === "Show") {
      setPassType("text");
      setPassstatus("Hide");
    } else {
      setPassType("password");
      setPassstatus("Show");
    }
  };
  const resetPass = () => {
    if (email === "") {
      setEmailerror("It should not be empty");
      return;
    } else {
      setEmailStatus("green");
    }
    setLoginState(true);
    sendPasswordResetEmail(auth , email)
      .then(() => {
        setToast("Mail Sent.Check Your Email", 'toastS');
        router.push("/");
      })
      .catch((error) => {
        setToast(error.message, 'toastF');
      });
  };

  return (
    <div className="loginForm flex_c mrb_1">
      {loginState?(
      <>
      <div className="center">
        <Loader/>
      </div>
      </>):(
        <>
        <div className="userName flex_c mrb_1">
        <label htmlFor="email">Email (Enter you registered email 📧)</label>
        <input
          className={`cinput ${emailStatus}`}
          type="email"
          name="email"
          id="email"
          placeholder="codeviral@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value.trim())}
        />
        <span className="errorMsg">{emailerror}</span>
      </div>
      <div className="submitBtn" onClick={resetPass}>
        Get Password Reset Mail
      </div>
        </>
      )}
      
    </div>
  );
};

export default ResetPass;
