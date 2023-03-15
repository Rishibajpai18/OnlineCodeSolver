import Layout from '../component/layout'
import ContextProvider from '../context/ContextProvider'
import '../styles/globals.css'
import Script from 'next/script'
import Router  from 'next/router'

import "../styles/nprogress.css"
import nProgress from 'nprogress'
import ProfileLayout from '../component/profileComponents/profileLayout'



Router.events.on("routeChangeStart", () => { nProgress.start()});
Router.events.on("routeChangeComplete", () => nProgress.done());
Router.events.on("routeChangeError", () => nProgress.done());



function MyApp({ Component, pageProps , router}) {
  if (router.pathname.startsWith("/profile")){
    console.log(router.pathname);
    return(
      <ContextProvider>
        <ProfileLayout>
          <Component {...pageProps} />
        </ProfileLayout>
      </ContextProvider>
    )
  }
  return (
    <ContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
    </ContextProvider>
    
    )
}

export default MyApp
