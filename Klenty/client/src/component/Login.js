import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import PersonIcon from '@mui/icons-material/Person';
import Input from '@mui/material/Input';
import LockIcon from '@mui/icons-material/Lock';
import { Button, FormControl } from '@mui/material';
import {loginUser} from '../actions/index'
import '../style/Login.css';


function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch()

    function handleLogin(e) {
        e.preventDefault();
        dispatch(loginUser({email: email, password: password}))   
        props.closePopUp()
        props.login()
    }
  return (
      <form onSubmit={handleLogin}>
        <FormControl className="formcontrol">
            <Input
                name="email"
                placeholder="Email"
                className="textbox"
                value={email}
                onChange={event => setEmail(event.target.value)}
            />
            <PersonIcon className="login_icon" />
        </FormControl><br/>
        <FormControl className="formcontrol">
              <Input
                  name="password"
                  type="password"
                  className="textbox"
                  placeholder="Password"
                  onChange={event => setPassword(event.target.value)}
                  value={password}
              />
              <LockIcon className="login_icon" />
          </FormControl> <br/><br/>
          <Button type="submit" variant="contained" className="submit-button" >Login</Button>
      </form>
  )
}

export default Login