import React, { useContext } from 'react'
import BaseContext from '../../context/ContextCreator'
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head'
import { auth } from '../../firebase';

const Dashboard = () => {

    const context = useContext(BaseContext);
    const { signout, user } = context;
    const randomName = Math.random();
    return (
        <>
            <Head>
                <title>
                    UserDashboard
                </title>
            </Head>
            {user ? (
                <div className='profilePageContainer'>
                    <div className="profileHead">
                        <div className="userImage">
                            <Image src={`https://avatars.dicebear.com/api/bottts/${randomName}.svg`} height={100} width={100} alt="UserProfile" />
                        </div>
                        <div className="userDisplayName">
                            <span className='username'>
                                {user.displayName}

                            </span>
                            {auth.currentUser.emailVerified ?
                                (
                                    <div className="isEmailVerified bg_col_verified">
                                        Verified
                                    </div>
                                ) :
                                (
                                    <div className="isEmailVerified bg_col_unverified" onClick={alert("Check you email to verify you account. You can't save codes without Email Verification")}>
                                        UnVerified
                                    </div>
                                )
                            }

                        </div>

                    </div>

                    <div className="profileStat">
                        <div className="statCard totalCodeCard">
                            <div className="tag">
                                Total Codes
                            </div>
                            <div className="valueAdded">
                            coming soon
                            </div>
                        </div>
                        <div className="statCard privateCodeCard">
                            <div className="tag">
                                Private Codes
                            </div>
                            <div className="valueAdded">
                            coming soon
                            </div>
                        </div>
                        <div className="statCard publicCodeCard">
                            <div className="tag">
                                Public Codes
                            </div>
                            <div className="valueAdded">
                                coming soon
                            </div>
                        </div>
                    </div>

                    <div className='center'>
                        <div className="buttonEffect" onClick={signout}>
                            Log Out
                        </div>
                    </div>
                </div>
            ) :

                <>
                    <div className="firstloginbtn">
                        <Link href="/u/login">
                            <a>Login First</a>
                        </Link>
                    </div>
                </>
            }
        </>
    )
}

export default Dashboard