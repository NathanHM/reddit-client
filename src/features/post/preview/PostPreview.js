import { useEffect } from 'react';
import styles from './PostPreview.module.css';
import { Navigate } from 'react-router';
import { Link } from 'react-router-dom';

export default function PostPreview({ data }) {

    const author = data.author;
    const title = data.title;
    const subreddit = data.subreddit;
    const permalink = data.permalink;
    const id = data.id;
    const upvotes = data.ups;
    const time = data.created_utc
    const date = new Date(time * 1000)
    const link = data.post_hint === 'link'

    const postData = {
        subreddit, id
    }

    return (
        <div className={styles.post}>
            <div className={styles.points} >
                <p>Points: {upvotes}</p>
            </div>
            <div>

                {link ?
                    <Link
                        key={id}
                        to={data.url}
                        target='_blank'
                        className={styles.link}
                    >
                        <h1 className={styles.container}>{title}</h1>
                    </Link>
                    :
                    <Link
                        key={id}
                        to={`/${subreddit}/${id}`}
                        data={postData}
                        className={styles.link}
                    >
                        <h1 className={styles.container}>{title}</h1>
                    </Link>
                }

                <div className={styles.section} >
                    <h2>{author}</h2>
                    <h2>{subreddit}</h2>
                </div>
                <div className={styles.section} >
                    <p>Date: {date.toDateString()} </p>
                    <p>Time: {date.toTimeString()} </p>
                </div>
            </div>
        </div>
    )

}