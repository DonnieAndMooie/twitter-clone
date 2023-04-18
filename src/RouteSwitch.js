import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from './App'
import Homepage from './Components/Homepage'
import SignUp from './Components/SignUp'
import { useState, useEffect } from 'react'
import { query, collection, onSnapshot} from "firebase/firestore"
import TweetPage from './Components/TweetPage'
import { db } from './Firebase'
import UserPage from './Components/UserPage'

export default function RouteSwitch() {
  const  [currentUser, setCurrentUser] = useState()
  const [tweetRoutes, setTweetRoutes] = useState([])
  const [userRoutes, setUserRoutes] = useState([])

  useEffect(() => {
    setTweetRoutes([])
    async function fetchTweets(){
      const q = query(collection(db, "tweets"))
      onSnapshot(q, function(snapshot){
        snapshot.docChanges().forEach(function(change){
          const tweet = change.doc.data()
          const id = change.doc.id
          const newRoute = <Route key={id} path={`/${id}`} element={<TweetPage tweet={tweet} currentUser={currentUser}/>}></Route>
          setTweetRoutes((prevRoutes) => {
            return [...prevRoutes, newRoute]
          })
        })
      })

    }
    fetchTweets()
  }, [currentUser])

  useEffect(() => {
    async function fetchUsers(){
      setUserRoutes([])
      const q = query(collection(db, "users"))
      onSnapshot(q, function(snapshot){
        snapshot.docChanges().forEach(function(change){
          const user = change.doc.data()
          const id = change.doc.id
          const newRoute = <Route key={id} path={`/${id}`} element={<UserPage user={user} currentUser={currentUser}/>}></Route>
          setUserRoutes((prevRoutes) => {
            return [...prevRoutes, newRoute]
          })
        })
      })

    }
    fetchUsers()
  }, [currentUser])
  

  return (
        <Routes>
            <Route path="/" element={<App setCurrentUser={setCurrentUser}/>}></Route>
            <Route path="/sign-up" element={<SignUp />}></Route>
            <Route path="/dashboard" element={<Homepage currentUser={currentUser}/>}></Route>
            {tweetRoutes}
            {userRoutes}
        </Routes>
  )
}
