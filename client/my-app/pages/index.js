import Head from 'next/head'
import Axios from 'axios'
import styles from '../styles/Home.module.css'

import React, {useState, useEffect} from 'react'
import Link from 'next/Link'
import { csv } from 'd3'
import axios from 'axios'

export default function Home() {
  //pushshift api
  const [data, setData] = useState([]);
  useEffect(() => {
    axios('https://api.pushshift.io/reddit/search/comment/?q=GME&subreddit=wallstreetbets&size=100&after=3h')
    // axios('https://api.pushshift.io/reddit/search/submission/?q=TSLA&subreddit=wallstreetbets&size=0&after=1d&aggs=created_utc&frequency=day')
      .then(response=> {
        setData(response.data);
      })
      .catch(err => {
        console.log(err);
      })
  },[])
  console.log(data);
  // console.log(data.data.length);
  return (  
    <div className={styles.container}>
      <Head>
        <title>wsb-tracker</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <main>
        <div>
          <h1 className={styles.title}>
            Welcome to <a>WallStatusBets.io!</a>
          </h1>

          <p className={styles.description}>
            What do the people of the {' '}
            <code className={styles.code}>r/wallstreetbets</code>
            {' '} think?
          </p>
          <div className={styles.start}>
            <Link href="/searchResult">Start!</Link>
          </div>
        </div>

        <div className={styles.trending}>
          <h1>Trending <br></br></h1>
          <p className={styles.description}><code className={styles.code}>r/wallstreetbets</code></p>

          <p className={styles.description}><code className={styles.code}>WallStatusBets.io</code></p>
          </div>
      </main>
      


      <footer className={styles.footer}>
        <a classname={styles.github}
          href="https://github.com/minsooerickim"
          target="_blank"
          rel="noopener noreferrer"
        >
        Powered by &nbsp;<span>Minsoo Kim</span>
        </a>
      </footer>
    </div>
  )
}
