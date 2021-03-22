import React, { useState, useEffect } from 'react';
import useStyles from './styles';
import FileBase from 'react-file-base64';
import { TextField, Typography, Paper, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';

import { useSelector } from 'react-redux'


const Form = ({ currentId, setCurrentId }) => {

    const post = useSelector((state) => currentId ? state.posts.find(p => p._id === currentId) : null)
    const classes = useStyles();
    const dispatch = useDispatch();
    useEffect(() => {
        if (post) {
            setPostData(post);
        }
    }, [post])
    const [postData, setPostData] = useState({
        creator: '', title: '', message: '', tags: '', selectedFile: ''
    });
    const clear = () => {
        setCurrentId(null);
        setPostData(
            {
                creator: '', title: '', message: '', tags: '', selectedFile: ''
            }
        )
    }
    const handleChange = (e) => {
        if (e.target.name === "tags") {
            setPostData({ ...postData, tags: e.target.value.split(',') })
        } else {
            setPostData({
                ...postData,
                [e.target.name]: e.target.value
            })
        }

    }
    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId) {
            dispatch(updatePost(currentId, postData))
        } else {
            dispatch(createPost(postData));
        }
        // console.log(postData);
        clear();
    }
    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? `Editing` : 'Creating'} a Memory</Typography>
                <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => handleChange(e)} />
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => handleChange(e)} />
                <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => handleChange(e)} />
                <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => handleChange(e)} />
                <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button className={classes.buttonSubmit} variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form
