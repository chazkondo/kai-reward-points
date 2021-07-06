import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {useEffect, useState} from 'react'

import axios from 'axios'

export default function Home() {

  const [points, setPoints] = useState('Loading')
  const [lock, setButtonLock] = useState(false)
  const [passwordDiv, setPasswordDiv] = useState('none')
  const [pointsUpdated, updatePoints] = useState(0)
  const [passwordValue, setPasswordValueState] = useState('')

  useEffect(()=>{
    let mounted = true;
    if (mounted) {
      const source = axios.CancelToken.source();
      axios
      .get(`/api/points`, {
        cancelToken: source.token,
      })
      .then((res) => {
          const data = res.data.data;
          if (!data.length) {
            setPoints(0)
          } else {
            const total = data.reduce(function (a, b) {
              return {points: a.points + b.points}; // returns object with property x
            })
  
            setPoints(total.points)
          }
      })
      .catch((err) => {
        console.log('err')
      })
    }
    return ()=>{
      mounted = false;
    }
  },[pointsUpdated])

  useEffect(()=>{
    if (passwordValue === 'kaikaidoodoo') {
      alert('Success')
      addPoints(20)
      setPasswordDiv('none')
      setPasswordValueState('')
    }
  },[passwordValue])

  function addPoints(body) {
    setButtonLock(true)
    axios
      .post(`/api/points`, {
        points: body
      })
      .then((res) => {
        updatePoints(previous=>previous+1)
        setButtonLock(false)
      })
      .catch((err) => {
        console.log('err', err)
        alert('Sorry an error occurred.')
        setButtonLock(false)
      })
  }

  function showPasswordDiv() {
    setPasswordDiv('flex')
  }
  
  function setPasswordValue(e) {
    setPasswordValueState(e)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Kai Reward Points</title>
        <meta name="description" content="A System To Track My Child's Reward Points" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Kai's Reward Points
        </h1>

        <h2>Points: {points}</h2>

        <button className={styles.description} onClick={()=>showPasswordDiv()} disabled={lock}>
          Add Points
        </button>

      </main>

      <div style={{display: passwordDiv}} className={styles.modal}>
        <input autoFocus placeholder={'hi'} onChange={(e) => setPasswordValue(e.target.value)} value={passwordValue}/>
      </div>

    </div>
  )
}
