import React from 'react';
import Post from './Post/Post';
import useStyles from './styles';
import { useSelector } from 'react-redux'
import { Grid, CircularProgress } from '@material-ui/core';


const Posts = ({ setCurrentId, setLikeAdd }) => {
    const posts = useSelector((state) => state.posts)
    const classes = useStyles();
    // console.log(posts);
    return (
        !posts.length ? <CircularProgress /> : (
            <Grid className={classes.container} alignItems="stretch" container spacing={3}>
                {posts.map(post => (
                    <Grid key={post._id} xs={12} sm={6} item>
                        <Post setLikeAdd={setLikeAdd} post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
    )
}

export default Posts
