import Head from "next/head";
import Image from "next/image";
import Script from "next/script";
import { firestore } from "../firebase";
import React, { useEffect, useState, useContext } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';

import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import Loader from "../component/loader";
import BaseContext from "../context/ContextCreator";
import Search from "../component/search";
import Link from "next/link"
import CodeArea from "../component/codearea";

export default function Home() {
  const [codePosts, setCodePosts] = useState([]);
  const [lastVisible, setLastVisible] = useState([])
  const [hasNext, setHasNext] = useState(true)

  const context = useContext(BaseContext);
  const {
    user,
    setToast,
    deletePost,
    searching,
    setSearching,
    coptToClipboard,
    router,
    goUp
  } = context;

  useEffect(() => {
    setCodePosts([]);
    const getCodePosts = async () => {
      // setSearching(true);
      const querySnapshot =await  getDocs(
        query(
          collection(firestore, "CodePosts"),
          where("posttype", "==", "Public"),
          orderBy("date", "desc"),
          limit(7)
        )
      );
      setCodePosts([]);
      
      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);

      (querySnapshot).forEach((snap)=>{
          
        setCodePosts((prev) => [...prev, snap.data()]);
          
      })
      // setSearching(false);
    };
    getCodePosts();

  }, []);

  const getMoreCodes =async ()=>{
    
    const nextQuerySnapshot =  await getDocs(
      query(
        collection(firestore, "CodePosts"),
        where("posttype", "==", "Public"),
        orderBy("date", "desc"),
        startAfter(lastVisible),
        limit(7),
        
      )
    );
    setLastVisible(nextQuerySnapshot.docs[nextQuerySnapshot.docs.length - 1]);
    if(
      nextQuerySnapshot.empty){
      setHasNext(false);
      return
    }
    nextQuerySnapshot.forEach(ele =>{
      setCodePosts((prev) => [...prev, ele.data()]);
    })

    
    // setSearching(false)
    // setUserPost([]);
    
  }
  
  return (
    <div className="">
      <Head>
        <meta
          name="description"
          content="Save Your Codes easily and share them with the World. Save your code in Public And Private Mode. Hackerrank Solutions. Code Solutions."
        />
        <meta name="keywords" content="code viral , codeviral , CodeViral, Hackerrank Solution, codes" />
        <meta name="author" content="Shivam Saksham"/>
        <link rel="icon" href="/favicon.ico" />
        <title>CodeViral</title>
      </Head>
      <div className="">
        <div className="landing">
          <div className="slogan">&lt;Where Code Lives/&gt;</div>
          {/* <div className="sloganHelper">This is Where Coders Leave Their Code,<br />So That They Can Live Happily And Fulfill Their Life Goal</div> */}
          <div className="sloganHelper">Save Your Code : Share Your Code : Make it Viral.<br />Create Account to Save Codes</div>
          <Link  href={user?'u/createPost':"/u/createaccount"}>
            <a className="buttonEffect">Save Your Code</a>
          </Link>
        </div>
        <div className="search">
          <Search />
        </div>
        <div className="allPost flex_c">
          <InfiniteScroll
            dataLength={codePosts.length}
            next={getMoreCodes}
            hasMore={hasNext}
            loader={<Loader/>}
            endMessage={
              <div className="center">
                "No More Codes"
              </div>
            }
          >
            {codePosts && Object.values(codePosts).map((val, key) => {
            return (
              <div key={key}>
                <CodeArea val={val}/>
              </div>
            );
          })}
          </InfiniteScroll>
          
          {searching ? (
            <div className="center">
              <Loader />
            </div>
          ) : (
            <div className="center">
              <Link href="/u/createPost" >
                <a className="addPostForPublicButton">Add Your Code</a>
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="floatingButtonToGOUp" onClick={()=> {goUp()}}>
        <ion-icon name="caret-up-outline"></ion-icon>
      </div>
    </div>
  );
}

// export async function getServerSideProps(context){
  
//   const querySnapshot = await getDocs(
//     query(
//       collection(firestore, "CodePosts"),
//       where("posttype", "==", "Public"),
//       orderBy("date", "desc"),
//       limit(7)
//     )
//   );
//   let Codeposts = []
//   querySnapshot.forEach((ele) =>{
//     Codeposts.push(ele.data())
//   })
//   Codeposts = JSON.parse(JSON.stringify(Codeposts))
//   return {
//     props : {Codeposts}
//   }
// }