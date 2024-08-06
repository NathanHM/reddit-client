import styles from './PostPreview.module.css';

export default function PostPreview({ data }) {

    const author = data.author;
    const title = data.title;
    const subreddit = data.subreddit;
    const permalink = data.permalink;
    const id = data.id;
    const ad = data.is_created_from_ads_ui;
    const upvotes = data.ups;
    const type = data.post_hint
    const time = data.created_utc
    const date = new Date(time * 1000)

    if (ad) {
        return;
    }

    return (
        <div className={styles.post}>

            <div className={styles.points} >
                <p>Points: {upvotes}</p>
            </div>
            <div>
                <h1 className={styles.container}>{title}</h1>
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