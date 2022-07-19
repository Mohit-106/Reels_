import * as React from "react";
import { AuthContext } from "../Context/AuthContext";
import { useState, useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./Signup.css";
import instaimg from "../Assets/instagram.png";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Link, useHistory } from "react-router-dom";
import { database, storage } from "../firebase";

export default function SignUp() {

  //use states
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [fullName,setfullName] = useState('');
  const [file,setFile] = useState(null);
  const [error,setError] = useState('');
  const [loading,setLoading] = useState(false)
  const history = useHistory();
  const {signup} = useContext(AuthContext);

  const handleClick = async() => {
    if(file==null){
        setError("Please upload profile image first");
        setTimeout(()=>{
            setError('')
        },2000)
        return;
    }
    try{
        setError('');
        setLoading(true);
        let userObj = await signup(email,password);
        let uid = userObj.user.uid;
        const uploadTask = storage.ref(`/users/${uid}/ProfileImage`).put(file);
        uploadTask.on('state_changed',fn1,fn2,fn3);
        function fn1(snapshot){
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
            console.log(`Upload is ${progress} done.`)
        }
        function fn2(error){
            setError(error);
            setTimeout(()=>{
                setError('')
            },2000);
            setLoading(false)
            return;
        }
        function fn3(){
            uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
                console.log(url);
                database.users.doc(uid).set({
                    email:email,
                    userId:uid,
                    fullname:fullName,
                    profileUrl:url,
                    createdAt:database.getTimeStamp()
                })
            })
            setLoading(false);
            history.push('/')
        }
    }catch(err){
        setError(err.message);
        setTimeout(()=>{
            setError('')
        },2000)
    }
}

  return (
    <div className="signUp-wrapper">
      <div className="signUp-card">
        <Card variant="outlined">
          <CardContent>
            <div className="insta-img">
              <img src={instaimg} />
            </div>
            <Typography className="text1" align="center" variant="subtitle2">
              Sign up to see photos and videos from your friends
            </Typography>
            {error!=='' && (
              <Alert severity="error" className="alert">
                {error}
              </Alert>
            )}
            <TextField
              id="outlined-basic"
              label="Email"
              required
              variant="outlined"
              fullWidth={true}
              margin="dense"
              size="small"
              value={email} onChange={(e)=>setEmail(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              type="Password"
              label="Password"
              variant="outlined"
              fullWidth={true}
              margin="dense"
              size="small"
              value={password} onChange={(e)=>setPassword(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Full Name"
              variant="outlined"
              fullWidth={true}
              margin="dense"
              size="small"
              value={fullName} onChange={(e)=>setfullName(e.target.value)}
            />
           <Button variant="outlined" color="secondary" fullWidth={true} margin="dense" startIcon={<CloudUploadIcon/>}
           component="label">Upload profile photo <input type="file" accept="image/*" hidden onChange={(e)=>setFile(e.target.files[0])} ></input></Button>
          </CardContent>
          <CardActions>
            <Button variant="contained" fullWidth={true} margin="dense" size="small" disabled={loading} onClick={handleClick} >Sign Up</Button>
          </CardActions>
        </Card>
        <Card className="crd2" variant="outlined">
          <Typography className="text2" align="center" variant="subtitle2" >
            Have an account? <Link to="/login" style={{textDecoration:"none"}}>Log in</Link>
          </Typography>

        </Card>
      </div>
    </div>

  );
}
