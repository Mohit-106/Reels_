import * as React from "react";
import { useContext,useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./Login.css";
import instaimg from "../Assets/instagram.png";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import {Link, useHistory} from "react-router-dom";
import Background from "../Assets/mockup2.png";
import { AuthContext } from "../Context/AuthContext";


export default function Login() {
  const store = useContext(AuthContext);
  console.log(store);
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [error,setError] = useState('');
  const [loading,setLoading] = useState(false);
  const history = useHistory();
  const {login} = useContext(AuthContext);
  const {user} = useContext(AuthContext);

  const handleClick = async() => {
    try{
        setError('');
        setLoading(true)
        let res = await login(email,password);
        setLoading(false);
        console.log(user);
        history.push('/')
    }catch(err){
        setError(err.message);
        setTimeout(()=>{
            setError('')
        },3000);
        setLoading(false);
    }
}
  return (
    <div className="Login-wrapper">

       <div className="Login-card-mockup">
       <div className="mockup">
       <img className="mockup-img"  src={Background} />
       </div>
       </div>
      <div className="Login-card">
        <Card variant="outlined">
          <CardContent>
            <div className="insta-img">
              <img src={instaimg} />
            </div>
            
            {error && (
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
            <Typography color="primary" align="center" variant="subtitle2">
              Forgot Password?
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" fullWidth={true} margin="dense" size="small" disabled={loading} onClick={handleClick} >Sign in</Button>
          </CardActions>
        </Card>
        <Card className="crd2" variant="outlined" >

          <Typography className="text2" align="center" variant="subtitle2" >
            Don't Have an account? <Link to="/signUp" style={{textDecoration:"none"}}> Sign up </Link>
          </Typography>

        </Card>
      </div>


    </div>
  );
}
