import { useEffect, useState } from "react";
import { useParams } from "react-router";
import jQuery from 'jquery';
import styles from './Post.module.css'
import Image from "./types/Image";
import Video from './types/Video';
import Text from "./types/Text";
import Gallery from './types/Gallery';
import RichVideo from "./types/RichVideo";


export default function Post() {
    const { subreddit, id } = useParams();

    const [post, setPost] = useState({});
    const [comments, setComments] = useState({});

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

    if (jQuery.isEmptyObject(post)) {
        return (
            <div className={styles.container}>
                <div className={styles.dashboard}>
                    <p>Loading...</p>
                </div>
            </div>
        )
    }

    console.log(comments)

    if (post.post_hint === 'image') {
        return (
            <Image data={post} />
        )
    }

    if (post.post_hint === 'rich:video') {

        return (
            <RichVideo data={post} />
        )
    }

    if (post.is_video) {

        return (
            <Video data={post} />
        )
    }

    if (post.is_gallery) {
        return (
            <Gallery data={post} />
        )
    }

    return (
        <Text data={post} />
    )

}