import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import PersonIcon from '@mui/icons-material/Person';
import Input from '@mui/material/Input';
import LockIcon from '@mui/icons-material/Lock';
import { Button, FormControl } from '@mui/material';

import {signupuser} from '../actions/index'
import '../style/Login.css';

function Signup(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const dispatch = useDispatch()

  function handleSignup(e) {
    e.preventDefault();
    let data = {username: username, email: email, password: password}
    dispatch(signupuser(data))
    props.closePopUp()
  }
  return (
    <form onSubmit={handleSignup}>
         <FormControl className="formcontrol">
            <Input
                name="username"
                placeholder="username"
                className="textbox"
                value={username}
                onChange={event => setUsername(event.target.value)}
            />
            <PersonIcon className="login_icon" />
        </FormControl><br/>
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
          <Button type="submit" variant="contained" className="submit-button" >SIGN UP</Button>
      </form>
  )
}

export default Signup