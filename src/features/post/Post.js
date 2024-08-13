import { useEffect, useState } from "react";
import { useParams } from "react-router";
import jQuery from 'jquery';
import styles from './Post.module.css'
import subStyles from './SubStyles.module.css';
import Image from "./types/Image";
import Video from './types/Video';
import Text from "./types/Text";
import Gallery from './types/Gallery';
import RichVideo from "./types/RichVideo.js";
import Comment from '../comments/Comment.js';
import Vote from "../vote/Vote.js";


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
                <div className={styles.content}>
                    <div className={styles.titleContainer}>

                        <Vote data={post} />

                        <div className={styles.details}>
                            <h1>{post.title}</h1>
                            <div className={styles.section}>
                                <h2><a href={'https://old.reddit.com/u/' + post.author} target='_blank' rel="noreferrer">{post.author}</a></h2>
                                <h2>{new Date(post.created * 1000).toLocaleDateString('en-UK')} : {new Date(post.created * 1000).toLocaleTimeString('en-UK')} </h2>
                            </div>
                            <div className={styles.section}>
                                <h3 className={subStyles[post.subreddit]}>{post.subreddit}</h3>
                                <h3>{post.link_flair_text} </h3>
                            </div>

                        </div>

                    </div>

                    <div className={styles.postContent}>
                        {type}
                    </div>


                    {Object.values(comments).map(comment => <Comment data={comment} key={comment.data.id} />)}

                </div>
            </div>
        </div>
    )
}