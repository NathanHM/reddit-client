import { useEffect, useState } from "react";
import { useParams } from "react-router";
import jQuery from 'jquery';
import styles from './Post.module.css'
import Image from "./types/Image";
import Video from './types/Video';
import Text from "./types/Text";
import Gallery from './types/Gallery';
import RichVideo from "./types/RichVideo.js";
import Comment from '../comments/Comment.js';


export default function Post() {
    const { subreddit, id } = useParams();

    const [post, setPost] = useState({});
    const [comments, setComments] = useState({});
    const [type, setType] = useState(<></>);

    useEffect(() => {
        const fetchPostData = async () => {
            const data = await fetch('https://www.reddit.com/r/' + subreddit + '/comments/' + id + '.json', {
                method: 'GET'
            });
            const json = await data.json();

            setPost(json['0'].data.children[0].data)
            setComments(json['1'].data.children)

        }
        fetchPostData()
    }, [subreddit, id])

    useEffect(() => {
        if (post.post_hint === 'image') {
            setType(< Image data={post} />)
        }
        else if (post.post_hint === 'rich:video') {
            setType(<RichVideo data={post} />)
        }
        else if (post.is_video) {
            setType(<Video data={post} />)
        }
        else if (post.is_gallery) {
            setType(<Gallery data={post} />)
        }
        else {
            setType(<Text data={post} />)
        }
    }, [post])

    if (jQuery.isEmptyObject(post)) {
        return (
            <div className={styles.container}>
                <div className={styles.dashboard}>
                    <p>Loading...</p>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.dashboard}>

                <h1 className={styles.container} >{post.title}</h1>
                <h2 className={styles.container} >Posted at: {Date(post.created * 1000).toLocaleString()}</h2>
                <h2 className={styles.container} >Posted by: {post.author}</h2>

                {type}

                {Object.values(comments).map(comment => <Comment data={comment} key={comment.data.id} />)}

            </div>
        </div>
    )
}