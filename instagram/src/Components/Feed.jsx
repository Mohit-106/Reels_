import React, { useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useContext } from "react";
import "./Feed.css";
import UploadFile from "./UploadFile";
import { database } from "../firebase";
import Posts from "./Posts";
import Navbar from "./Navbar";
function Feed() {
  const { logout, user } = useContext(AuthContext);
  const [userData, setUserData] = useState("");
  //with this use we get all data from the database/storage
  useEffect(() => {
    const unsub = database.users.doc(user.uid).onSnapshot((snapshot) => {
      setUserData(snapshot.data());
    });
    return () => {
      unsub();
    };
  }, [user]);
  

  return (
    <>
      <Navbar userData={userData}/>
      <div className="main">
        <div className="main2">
          <button onClick={logout}>logout</button>
        </div>
        <></>

        <UploadFile user={userData} />
        <Posts user={userData} />
      </div>
    </>
  );
}

export default Feed;
