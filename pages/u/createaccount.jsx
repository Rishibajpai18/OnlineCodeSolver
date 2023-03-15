import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import React, { useState, useContext } from "react";
import BaseContext from "../../context/ContextCreator";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

import { auth } from "../../firebase";
import Loader from "../../component/loader";
const CreateAcc = () => {
  const context = useContext(BaseContext);
  const { user, setUser, setToast } = context;
  const router = useRouter();
  const [passType, setPassType] = useState("password");
  const [passstatus, setPassstatus] = useState("Show");

  const [username, setUsername] = useState("");
  const [usernameStatus, setUsernameStatus] = useState("");
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState("");
  const [password, setPassword] = useState("");
  const [passStatus, setPassStatus] = useState("");
  // errors
  const [emailerror, setEmailerror] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passError, setPassError] = useState("");

  const [signState, setSignState] = useState(false);
  const changePassType = () => {
    if (passstatus === "Show") {
      setPassType("text");
      setPassstatus("Hide");
    } else {
      setPassType("password");
      setPassstatus("Show");
    }
  };

  const createAccount = () => {
    setUsernameError("");
    setEmailerror("");
    setPassError("");
    if (username == "") {
      setUsernameError("It should not be empty");
      setUsernameStatus("");
      return;
    } else if (username.length < 4) {
      setUsernameError("It should have more than 4 character");
      setUsernameStatus("");
      return;
    } else {
      setUsernameStatus("green");
    }
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
    setSignState(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateProfile(auth.currentUser, {
          displayName: username,
        })
          .then(() => {
            setUser(auth.currentUser);
            router.push("/");
          })
          .catch((error) => {
            console.log(error);
          });

        // verification
        sendEmailVerification(auth.currentUser).then(() => {
          setToast("Verification Email sent to the registered mail." , "toastS");
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setToast(errorMessage , 'toastF');
        setSignState(false);
      });
  };
  return (
    <>
      <Head>
        <title>CreateAccount</title>
      </Head>
      <div className="loginForm flex_c">
        {signState ? (
          <div className="center">
            <Loader />
          </div>
        ) : (
          <>
            <div className="userName flex_c mrb_1">
              <label htmlFor="username">Username (Choose unique one 😎)</label>
              <input
                className={`cinput ${usernameStatus}`}
                type="text"
                name="username"
                id="username"
                autoComplete="off"
                placeholder="No space , No special character"
                value={username}
                onChange={(e) => setUsername(e.target.value.trim())}
              />
              <span className="errorMsg">{usernameError}</span>
            </div>
            <div className="userName flex_c mrb_1">
              <label htmlFor="email">
                Email (We Will send Verification Mail 📧)
              </label>
              <input
                className={`cinput ${emailStatus}`}
                type="email"
                name="email"
                id="email"
                placeholder="johndoe@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value.trim())}
              />
              <span className="errorMsg">{emailerror}</span>
            </div>
            <div className="password flex_c mrb_1">
              <label htmlFor="pass">Password (Enter New Password 🔑)</label>
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
            </div>
            <div className="submitBtn" onClick={createAccount}>
              Create Acoount
            </div>
            <div className="switchAccountState">
              Already Have an Account ?
              <Link href="/u/login">
                <a>Login</a>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CreateAcc;
