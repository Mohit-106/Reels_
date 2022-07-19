import "./App.css";
import Signup from "./Components/SignUp";
import Login from "./Components/Login";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import Feed from "./Components/Feed";
import PrivateRoute from "./Components/PrivateRoute";
import Profile from "./Components/Profile";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={Signup}/>
        <PrivateRoute path="/profile/:id" component={Profile}/>
        <PrivateRoute path="/" component={Feed}/>
        
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
