import React, { useContext, useEffect } from "react";
import Loader from "../../component/loader";
import Search from "../../component/search";
import BaseContext from "../../context/ContextCreator";
import { firestore } from "../../firebase";
import Head from "next/head"
import CodeArea from "../../component/codearea";

const Query = () => {
  const context = useContext(BaseContext);
  const {
    router,
    searchResults,
    user,
    deletePost,
    searching,
    coptToClipboard,
    loadmore,
    isnext
  } = context;
  const { slug } = router.query;

  return (
    <>
    <Head>
      <title>Search | {slug}</title>
    </Head>
      <div className="searchContainer allPost center flex_c">
        <div className="search">
          <Search />
        </div>
        
        {!searching && searchResults.length < 1 ? "Sorry Nothing Found" : ""}
        {searchResults &&
          Object.values(searchResults).map((val, key) => {
            return (
              <CodeArea key={key} val={val}/>
            );
          })}
        {searching ? <Loader /> : ""}
        {!searching && searchResults.length > 1 ? (
        <>
        <div className="submitBtn curP" onClick={()=>loadmore(slug)}>
          {isnext}
        </div>
        </>) : ""}
      </div>
    </>
  );
};

export default Query;
