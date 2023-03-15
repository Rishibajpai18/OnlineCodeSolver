import { async } from '@firebase/util'
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { firestore } from '../firebase'
import Link from 'next/link'

const UpdateDb = () => {
    // const [ids, setIds] = useState([])

    // const getIds = async ()=>{
    //     setIds([])
    //     const q = collection(firestore,"CodePosts")

    //     const snap = await getDocs(q)

    //     snap.forEach(doc =>{
    //         setIds((prev) => [...prev , doc.id])
    //     })

    //     alert("id fetched")
    // }

    // const updateNow = async () => {

    //     ids.forEach(async (id) =>{
    //         const ref = doc(firestore , "CodePosts" ,id);

    //         await updateDoc(ref , {
    //             "likes":0,
    //             "likedBy":[],
    //         })

    //         console.log("updated ${id}");
    //     })
    // }
    return (
        <div className='center'>
            <h1>Hey Have Spare Time? Wanna Work For me in return of Experience ?</h1>
            <Link href="/contact">
                <a className='toSignInPage'>Contact me</a>
            </Link>
        </div>
    )
}

export default UpdateDb