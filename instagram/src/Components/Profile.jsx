import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { database } from "../firebase";
import { CircularProgress } from "@mui/material";
import Navbar from "./Navbar";
import Typography from "@mui/material/Typography";
import Avatar from '@mui/material/Avatar';
import Dialog from "@mui/material/Dialog";
import "./Profile.css";

function Profile() {
  const { id } = useParams();
  const [userData, setUserdata] = useState(null);
  const [posts, setPosts] = useState(null);
  const [open, setOpen] = useState(null);
  const handleClickOpen = (id) => {
    setOpen(id);
  };

  const handleClose = () => {
    setOpen(null);
  };
  useEffect(() => {
    database.users.doc(id).onSnapshot((snap) => {
      setUserdata(snap.data());
    });
  }, [id]);
  useEffect(() => {
    async function fetchData() {
        if (userData != null) {
            let parr = [];
            for (let i = 0; i < userData.postIds.length; i++) {
              let postData = await database.posts.doc(userData.postIds[i]).get();
              parr.push({ ...postData.data(), postId: postData.id });
            }
            setPosts(parr);
          }
      // ...
    }
    fetchData();
  }, [userData]);

  return (
    <>
      {posts == null || userData == null ? (
        <>
        <Typography style={{marginTop:"5rem",marginLeft:"28rem"}}  variant="h6">Upload atleast 1 video to see your profile</Typography>
        <CircularProgress style={{marginTop:"15rem",marginLeft:"40rem"}}/>
        </>
      ) : (
        <>
        <Navbar userData={userData}/>
        <div className="spacer"></div>
        <div className="container">
                    <div className="upper-part">
                        <div className="profile-img">
                            <img src={userData.profileUrl}/>
                        </div>
                        <div className="info">
                        <Typography variant="h6">
                                Name : {userData.fullname}
                            </Typography>
                            <Typography variant="h6">
                                Email : {userData.email}
                            </Typography>
                            <Typography variant="h6">
                                Posts : {userData?.postIds?.length}
                            </Typography>
                        </div>
                    </div>
                    <hr style={{marginTop:'3rem',marginBottom:'3rem'}}/>
                    <div className="profile-videos">
                    {
                        posts.map((post,index)=>(
                            <React.Fragment key={index}>
                                <div className="videos">
                                    <video muted="muted" onClick={()=>handleClickOpen(post.pId)} className="vid">
                                        <source src={post.pUrl}/>
                                    </video>
                                    <Dialog
                                        open={open==post.pId}
                                        onClose={handleClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                        fullWidth ={true}
                                        maxWidth = 'md'
                                    >
                                        <div className="modal-container">
                                            <div className="video-modal">
                                                <video  autoPlay={true} muted="muted" controls>
                                                    <source src={post.pUrl}/>
                                                </video>
                                            </div>
                                            
                                            
                                        </div>
                                    </Dialog>
                                </div>
                            </React.Fragment>
                        ))
                    }
                </div>
                </div>
         
        </>
      )}
    </>
  );
}

export default Profile;
