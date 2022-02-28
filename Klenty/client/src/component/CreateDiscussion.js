import { Button, FormControl, Input, TextareaAutosize } from '@mui/material';
import React, { useState } from 'react'
import '../style/CreateDiscussion.css'
import { useDispatch } from 'react-redux';
import {createDiscussion} from '../actions/index'

function CreateDiscussion(props) {
    const [topic, setTopic] = useState("");
    const [description, setDescription] = useState("");
    const dispatch = useDispatch()

    function handleSubmit(e) {
        e.preventDefault()

        let data = {title: topic, description: description}
        let header = {headers: {Authorization: localStorage.getItem('token')}}

        dispatch(createDiscussion(data, header))
        props.closePopUp()

      }
  return (
    <form onSubmit={handleSubmit}>
        <FormControl className="formcontrol">
            <label className='label-topic'>Topic</label><br/>
            <Input
                name="topic"
                className="textbox-topic"
                value={topic}
                onChange={event => setTopic(event.target.value)}
            />
        </FormControl><br/>
        <FormControl className="formcontrol">
            <label className='label-topic'>Description</label><br/>
              <TextareaAutosize
                minRows={20}
                name = "description"
                style={{ width: 500 }}
                value={description}
                onChange={event => setDescription(event.target.value)}
                />
          </FormControl> <br/><br/>
          <Button type="submit" variant="contained" className="discussionbtn" >Submit</Button>
      </form>
  )
}

export default CreateDiscussion