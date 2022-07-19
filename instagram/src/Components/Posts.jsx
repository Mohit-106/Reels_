import React, { useState, useEffect } from "react";
import { database } from "../firebase";
import "./Posts.css";
import CircularProgress from "@mui/material/CircularProgress";
import Video from "./Video";
import Avatar from "@mui/material/Avatar";

function Posts(userData) {
  const [posts, setPosts] = useState(null);
  const [open, setOpen] = useState(null);
  

  useEffect(() => {
    let parr = [];
    const unsub = database.posts
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        parr = [];
        querySnapshot.forEach((doc) => {
          let data = { ...doc.data(), postId: doc.id };
          parr.push(data);
        });
        setPosts(parr);
      });
    return unsub;
  }, []);

  const callback = (entries) => {
    entries.forEach((entry)=>{
        let ele = entry.target.childNodes[0]
        console.log(ele)
        ele.play().then(()=>{
            if(!ele.paused && !entry.isIntersecting){
                ele.pause()
            }
        })
    })
}
let observer = new IntersectionObserver(callback, {threshold:0.6});
useEffect(()=>{
  const elements = document.querySelectorAll(".videos")
  elements.forEach((element)=>{
      observer.observe(element)
  })
  return ()=>{
      observer.disconnect();
  }
},[posts])

  return (
    <div>
      {posts == null || userData == null ? (
        <CircularProgress />
      ) : (
        <div className="video-container">
          {posts.map((post, index) => (
            <React.Fragment key={index}>
              <div className="videos">
                <Video src={post.pUrl} id={post.pId} />
                <div className="fa" style={{ display: "flex" }}>
                  <Avatar alt="Cindy Baker" src={post.uProfile} />
                  <h5>{post.uName}</h5>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}

export default Posts;
