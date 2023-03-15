import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import React, { useState, useContext } from "react";
import BaseContext from "../../context/ContextCreator";
import { useRouter } from "next/router";
import Link from "next/link";
import { auth } from "../../firebase";
import Head from "next/head";
import Loader from "../../component/loader";

const Login = () => {
  const context = useContext(BaseContext);
  const { user, setUser, setToast } = context;
  const router = useRouter();
  const [passType, setPassType] = useState("password");
  const [passstatus, setPassstatus] = useState("Show");

  // const [username, setUsername] = useState("");
  // const [usernameStatus, setUsernameStatus] = useState("")
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState("");
  const [password, setPassword] = useState("");
  const [passStatus, setPassStatus] = useState("");
  // errors
  const [emailerror, setEmailerror] = useState("");
  // const [usernameError, setUsernameError] = useState("")
  const [passError, setPassError] = useState("");
  // login state
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

  const loginAccount = () => {
    setEmailerror("");
    setPassError("");

    if (email === "") {
      setEmailerror("It should not be empty");
      return;
    } else {
      setEmailStatus("green");
    }
    if (password.length < 7) {
      setPassError("It should have more than 8 character");
      setPassStatus("");
      return;
    } else {
      setPassStatus("green");
    }
    setLoginState(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        setToast("Logged In" , 'toastS');
        router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setToast("Wrong Credentials" , 'toastF');
        setLoginState(false);
      });
  };
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="loginForm flex_c">
        {loginState ? (
          <div className="center">

            <Loader />
          </div>
        ) : (
          <>
            <div className="userName flex_c mrb_1">
              <label htmlFor="email">
                Email (Enter you registered email 📧)
              </label>
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
            <div className="password flex_c mrb_1">
              <label htmlFor="pass">Password (Enter Your Password 🔑)</label>
              <input
                className={`cinput ${passStatus}`}
                type={passType}
                name="pass"
                id="pass"
                placeholder="enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value.trim())}
              />
              <span className="errorMsg">{passError}</span>
              <div className="showpass" onClick={changePassType}>
                ( {passstatus} )
              </div>
              <div className="forgetPass">
                Forgot Password ?
                <Link href="/resetPass">
                  <a> Reset</a>
                </Link>
              </div>
            </div>
            <div className="submitBtn" onClick={loginAccount}>
              Login
            </div>
            <div className="switchAccountState">
              Don't have an Account ?
              <Link href="/u/createaccount">
                <a>Create an Account</a>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Login;
