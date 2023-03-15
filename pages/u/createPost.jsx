import React, { useContext, useState } from "react";
import BaseContext from "../../context/ContextCreator";
import Link from "next/link";
import { auth, firestore } from "../../firebase";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import Head from "next/head";

const CreatePost = () => {
  const context = useContext(BaseContext);
  const { user, setToast } = context;
  const [tag, setTag] = useState("c");
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [posttype, setPosttype] = useState("Public");
  const [isAddingCode, setIsAddingCode] = useState(false)
  const handleRadioChange = (e) => {
    setPosttype(e.target.value);
  };
  const addPost = async () => {
    if (isAddingCode) {
      return;
    }
    
    if (auth.currentUser.emailVerified) {
      if (title.length < 5) {
        setToast("Enter Proper Title", "toastF");
        return;
      }
      if (code.length < 20) {
        setToast("Try to provide some explaination in code", "toastF");
        return;
      }
      setIsAddingCode(true);
      const newCityRef = doc(collection(firestore, "CodePosts"));
      await setDoc(newCityRef, {
        author: auth.currentUser.displayName,
        title: title,
        tag: tag,
        code: code,
        posttype: posttype,
        date: serverTimestamp(),
        pid: newCityRef.id,
        uid: auth.currentUser.uid,
        queryTag: title.toLowerCase().split(" "),
        likes: 0,
        likedBy:[]
      });
      setIsAddingCode(false);
      setToast("Post Created", "toastS");
      setTag("");
      setTitle("");
      setCode("");
    } else {
      setToast("Please Verify your email first");
    }
  };

  return (
    <>
      <Head>
        <title>CreatePost</title>
      </Head>
      <div className="container">
        {user ? (
          <div className="creaePostCard flex_c">
            <div className="tag flex_c">
              <label htmlFor="slug">Tag</label>
              {/* <input
                className="cinput"
                type="text"
                name="slug"
                id="slug"
                placeholder="example : c or c++ or python"
                value={tag}
                onChange={(e)=>setTag(e.target.value)}
              /> */}
              <select
                className="cinput"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              >
                <option value="c">C</option>
                <option value="python">Python</option>
                <option value="c++">C++</option>
              </select>
            </div>
            <div className="tag flex_c">
              <label htmlFor="title">Title</label>
              <input
                className="cinput"
                type="text"
                name="title"
                id="title"
                placeholder="WAP to calculate sum of factors."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="codeBody flex_c">
              <label htmlFor="orig_code">Code</label>
              <textarea
                className="cinput"
                type="text"
                name="orig_code"
                id="orig_code"
                placeholder="Paste your code here"
                cols="30"
                rows="20"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              ></textarea>
            </div>
            <div className="public_private flex_c">
              <div className="pub mrb_1">
                <input
                  type="radio"
                  id="public"
                  name="postType"
                  value="Public"
                  onChange={handleRadioChange}
                  defaultChecked
                />
                <label htmlFor="public">Public (everyone can see it)</label>
              </div>
              <div className="private mrb_1">
                <input
                  type="radio"
                  id="private"
                  name="postType"
                  value="Private"
                  onChange={handleRadioChange}
                />
                <label htmlFor="private">Private (only you can see)</label>
              </div>
            </div>
            <div className="submitBtn" onClick={addPost}>
              {isAddingCode?"Uploading":"Add Code"}
              
            </div>
          </div>
        ) : (
          <div className="firstloginbtn">
            <Link href="/u/login">
              <a>Login First</a>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CreatePost;
