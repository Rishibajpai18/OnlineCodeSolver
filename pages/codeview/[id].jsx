import { collection, getDocs, query, where } from 'firebase/firestore';
import Head from 'next/head';
import React, { useContext, useEffect, useState } from 'react'
import BaseContext from '../../context/ContextCreator'
import { firestore } from '../../firebase';

export default function CodeView ({Codepost}) {
  const context = useContext(BaseContext);

  const [desc, setDesc] = useState("")
  const { coptToClipboard } = context;
  
  useEffect(() => {
    Object.values(Codepost).map((val , key)=>{
      setDesc(val.title)
    })
  }, [])
  
  
  return (
    <div>
      <Head>
        <meta name="description" content={`Solution of Question ${desc}`} />
        <title>{desc}</title>
      </Head>
      {Codepost && Object.values(Codepost).map((val , key)=>{
        return(
          <div key={key} className="codePostContainer">
            <div className="titleOfCodePost">
              {val.title}
            </div>
            <div className="wrtierOfCodePost">
              #{val.author}
            </div>
            <div className="codeInPostView">
                  <div
                    className="copytoClipH curP"
                    onClick={() => coptToClipboard(val.code)}
                  >
                    <ion-icon name="clipboard-outline"></ion-icon>
                  </div>
                  <span className='codeInPOstView'>{val.code}</span>
              </div>
          </div>
        )
      })}
    </div>
  )
}

export async function getServerSideProps(context){
  // let context = useContext(BaseContext);

  const { id } = context.params;
  const querySnapshot = await getDocs(
    query(
      collection(firestore, "CodePosts"),
      where("pid", "==", id),
    )
  );
  let Codepost = []
  querySnapshot.forEach((ele) =>{
    Codepost.push(ele.data())
  })
  Codepost = JSON.parse(JSON.stringify(Codepost))
  return {
    props : {Codepost}
  }
}
