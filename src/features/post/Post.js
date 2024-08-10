import { useEffect, useState } from "react";
import { useParams } from "react-router";
import jQuery from 'jquery';
import styles from './Post.module.css'
import { v4 as uuidv4 } from "uuid";


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

            setPost(json['0'].data.children)
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

    console.log(post[0].data)

    if (post[0].data.post_hint === 'image') {
        return (
            <div className={styles.container}>
                <div className={styles.dashboard}>

                    <h1 className={styles.container} >{post[0].data.title}</h1>
                    <h2 className={styles.container} >Posted at: {Date(post[0].data.created * 1000).toLocaleString()}</h2>
                    <h2 className={styles.container} >Posted by: {post[0].data.author}</h2>

                    <div className={styles.container}>
                        <div className={styles.gallery} >

                            <div className={styles.imageContainer} >
                                <img className={styles.img} src={post[0].data.preview.images[0].source.url.replace('preview', 'i')} alt="" key={uuidv4()} />
                            </div>

                        </div>
                    </div>


                </div>
            </div>
        )
    }

    if (post[0].data.is_video) {

        return (
            <div className={styles.container}>
                <div className={styles.dashboard}>

                    <h1 className={styles.container} >{post[0].data.title}</h1>
                    <h2 className={styles.container} >Posted at: {Date(post[0].data.created * 1000).toLocaleString()}</h2>
                    <h2 className={styles.container} >Posted by: {post[0].data.author}</h2>
                    
                    <div className={styles.container}>
                        <div className={styles.videoContainer}>
                            <iframe src={post[0].data.media.reddit_video.fallback_url} title={post[0].data.title} width='100%' height='100%' />
                        </div>
                    </div>


                </div>
            </div>
        )
    }

    if (post[0].data.post_hint === 'rich:video') {

        const regex = /src="([^"]+)"/;
        const match = post[0].data.secure_media.oembed.html.match(regex);
        const url = match[1];

        return (
            <div className={styles.container}>
                <div className={styles.dashboard}>

                    <h1 className={styles.container} >{post[0].data.title}</h1>
                    <h2 className={styles.container} >Posted at: {Date(post[0].data.created * 1000).toLocaleString()}</h2>
                    <h2 className={styles.container} >Posted by: {post[0].data.author}</h2>

                    <div className={styles.container}>
                        <div className={styles.videoContainer}>
                            <iframe src={url} title={post[0].data.secure_media.oembed.title} width='100%' height='100%' />
                        </div>
                    </div>


                </div>
            </div>
        )
    }

    if (post[0].data.is_gallery) {
        return (
            <div className={styles.container}>
                <div className={styles.dashboard}>

                    <h1 className={styles.container} >{post[0].data.title}</h1>
                    <h2 className={styles.container} >Posted at: {Date(post[0].data.created * 1000).toLocaleString()}</h2>
                    <h2 className={styles.container} >Posted by: {post[0].data.author}</h2>

                    <div className={styles.container}>
                        <div className={styles.gallery} >
                            {Object.values(post[0].data.media_metadata).map(
                                image =>
                                    <div className={styles.imageContainer} >
                                        <img className={styles.img} src={image.s.u.replace('preview', 'i')} alt="" key={uuidv4()} />
                                    </div>
                            )}
                        </div>
                    </div>


                </div>
            </div>
        )
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.dashboard}>

                    <h1 className={styles.container} >{post[0].data.title}</h1>
                    <h2 className={styles.container} >Posted at: {Date(post[0].data.created * 1000)}</h2>
                    <h2 className={styles.container} >Posted by: {post[0].data.author}</h2>

                    <p>{post[0].data.selftext}</p>

                </div>
            </div>
        </>
    )

}