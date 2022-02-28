import React , { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import '../style/DiscussionDashboard.css';
import Button from '@mui/material/Button';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
// import AdjustIcon from '@mui/icons-material/Adjust';
import { Alert, Dialog, DialogContent, DialogTitle, IconButton, Snackbar } from '@mui/material';
import Login from '../component/Login';
import Signup from '../component/Signup';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CreateDiscussion from './CreateDiscussion';
import AddComments from './AddComments';
import {fetchAllDiscussion, resetError} from '../actions/index'

function DiscussionDashboard() {
    const [loginform, setLoginform] = useState(false);
    const [signupform, setSignupform] = useState(false);
    const [discussionform, setDiscussionform] = useState(false);
    const [commentform, setCommentform] = useState(false);
    const alert = useSelector(state => state.page.error)
    const errMsg = useSelector(state => state.page.errorMessage);
    const [isLoggedin, setIsLoggedIn] = useState(false);
    const [discussionId, setDiscussionId] = useState('')
    const discussions = useSelector(state => state.page.discussions) || []
    const dispatch = useDispatch()

    
    

    console.log('Altert Open ', alert)

    useEffect(() => {
        dispatch(fetchAllDiscussion())
    }, [discussions.length])

    function handleClose(){
        setSignupform(false);
        setLoginform(false); 
        setDiscussionform(false);
        setCommentform(false);
    }

    function callBackLogin() {
        setIsLoggedIn(true)
    }

    const handleLogOut = () => {
        console.log('Logout')
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        setIsLoggedIn(false)

    }
    console.log("Discussions ", discussions)
  return (
      
    <>
        <nav>
            <label className='logo'>DISCUSSION FORUM</label>
            <div className='btn_div'>
                {!localStorage.getItem('token') && <Button variant="contained" onClick={() => setLoginform(true)}>LOGIN</Button>} &nbsp; &nbsp;
                {!localStorage.getItem('token') && <Button variant="outlined" onClick={() => setSignupform(true)}>SIGN UP</Button>}
                {localStorage.getItem('token') && <Button variant="outlined" onClick={() => handleLogOut()}> Logout</Button> }     
            </div>
        </nav>

        <div className='username-div'>
         <label className='username-label'>Hi {localStorage.getItem('username') || 'Anonymous'} !!!</label>
            <div className='btn_div'>
                {localStorage.getItem('token') && <Button variant="contained" onClick={() => setDiscussionform(true)}>Add Discussion</Button> }     
            </div>
        </div>
        <div>
        {discussions && discussions.map(discussion => 
            <>
            <Card sx={{ maxWidth:"80vw" ,marginLeft:"15px",textAlign:'left', maxHeight:"40vh"}}>
                <CardContent>
                    <h2>Title - {discussion.title}</h2><br/>
                    <p className='description-display'>Description - {discussion.description}</p><br/>
                    <p>Comments:</p>
                    {discussion.comments.map(comment=> <p className='description-display'>{comment.comment}</p>)}
                </CardContent>
                <CardActions>
                    <Button variant="contained" size="small" className='commentbtn' onClick={() => {setCommentform(true);setDiscussionId(discussion._id)}}>Add Comments</Button>
                </CardActions>
            </Card><br/>
            </>
        )}
        
        </div>

        {/* Login, Signup navigation */}
        <Dialog open={loginform || signupform || discussionform || commentform} style={{maxWidth:"100vw",maxHeight:"100vh"}}>
            <DialogTitle className="dialog-box">
                {loginform && <span><strong>LOGIN</strong></span>}
                {signupform && <span><strong>Create Account</strong></span>}
                {discussionform && <span><strong>Create Discussion</strong></span>}
                {commentform && <span><strong>Add Comments</strong></span>}
                {/* <span className="dialog-icon"><IconButton><HighlightOffRoundedIcon style={{ color: "white" }} fontSize="large"  onClick={() =>{ setSignupform(false); setLoginform(false); setDiscussionform(false)} } /></IconButton></span> */}
                <span className="dialog-icon"><IconButton><HighlightOffRoundedIcon style={{ color: "white" }} fontSize="large"  onClick={() =>{handleClose()} } /></IconButton></span>

            </DialogTitle>
            <DialogContent dividers>
                {/* <Popupform closePopUp={this.modalPopUpOpenClose} create={this.createFormHandler} default_data={this.state.row_data} update={this.updateFormHandler} /> */}
                {loginform && <Login closePopUp={handleClose} login={callBackLogin}/>}
                {signupform && <Signup closePopUp={handleClose}/>}
                {discussionform && <CreateDiscussion closePopUp={handleClose}/>}
                {commentform && <AddComments discussionId = {discussionId} closePopUp={handleClose}/>}
            </DialogContent>
        </Dialog>
        
        <Snackbar open={alert} autoHideDuration={1000} onClose={() => dispatch(resetError())} anchorOrigin={{ vertical: 'top', horizontal: "center "}} style={{ top: '87px', right: '16px' }}>
            <Alert onClose={() => dispatch(resetError())} severity="success">
                {errMsg}
            </Alert>
        </Snackbar>
       
    </>
  )
}

export default DiscussionDashboard