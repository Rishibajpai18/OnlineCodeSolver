import React, { useContext, useEffect } from 'react'
import BaseContext from '../../context/ContextCreator';
import Link from 'next/link';
import Loader from '../../component/loader';
import Head from 'next/head'

const AddedCodes = () => {

  const context = useContext(BaseContext);
  const { getuserPosts, userPost, user, searching, isnext, getMoreUsersPost, deletePost } = context;

  useEffect(() => {
    if (user) {
      getuserPosts();
    }
  }, [user]);

  return (
    <div>
      <Head>
        <title>UserCodes</title>
      </Head>
      <div className="userPosts flex_c">
        {!searching &&userPost && userPost.length < 1 ? (
          <>
            <div className="center fc noCodeICon">
              <ion-icon name="bonfire-outline"></ion-icon>
              No Code Added Yet
              <Link href="/u/createPost">
                <a className='buttonEffect'>Add Code</a>
              </Link>
            </div>
          </>
        ) : (
          ""
        )}
        {user &&
          Object.values(userPost).map((val, key) => {
            return (
              <div className="postcard" key={key}>
                <Link href={`/codeview/${val.pid}`}>
                  <a><div className="postTitle">Q. {val.title}</div></a>
                </Link>
                <div className="postdata">
                  <div className="postOptions">
                    <div className="options">
                      <div
                        className="curP deletePost"
                        onClick={() => deletePost(val.pid)}
                      >
                        <ion-icon name="trash-bin-outline"></ion-icon>
                      </div>
                      <div
                        className="copytoClip curP"
                        onClick={() => coptToClipboard(val.code)}
                      >
                        <ion-icon name="clipboard-outline"></ion-icon>
                      </div>
                    </div>
                  </div>
                  <pre>
                    <code className="">{val.code}</code>
                  </pre>
                </div>
                <div
                  className="shareButton curP"
                  onClick={() => coptToClipboard(`https://www.codeviral.in/codeview/${val.pid}`)}
                >
                  <ion-icon name="share-social-outline"></ion-icon>Share
                </div>

              </div>
            );
          })}
      </div>
      <div className="loadMorebutton">

        {searching ? <Loader /> : ""}
        {!searching && userPost.length > 1 ? (
          <>
            <div className="submitBtn curP" onClick={() => getMoreUsersPost()}>
              {isnext}
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  )
}

export default AddedCodes