import { Button, FormControl, TextareaAutosize } from '@mui/material';
import React, { useState } from 'react'
import {addComment} from '../actions/index'
import { useDispatch } from 'react-redux';


function AddComments(props) {
    const [comments, setComments] = useState("");
    const dispatch = useDispatch()
    function handleSubmit(e) {
        e.preventDefault();
        let data  =  {username: localStorage.getItem('username'), comment: comments}
        let header = {headers: {Authorization: localStorage.getItem('token')}}
        dispatch(addComment(props.discussionId, data, header))
        props.closePopUp()
    }
  return (
    <>
        <form onSubmit={handleSubmit}>
        <FormControl className="formcontrol">
            <label className='label-topic'>Comments</label><br/>
              <TextareaAutosize
                minRows={20}
                name = "comments"
                style={{ width: 500,fontSize:"20px" }}
                value={comments}
                onChange={event => setComments(event.target.value)}
                />
          </FormControl> <br/><br/>
          <Button type="submit" variant="contained" className="discussionbtn" >Submit</Button>
        </form>
    </>
  )
}

export default AddComments