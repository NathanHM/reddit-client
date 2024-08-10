import styles from '../Post.module.css'

export default function Video({ data }) {
    return (
        <div className={styles.container}>
            <div className={styles.dashboard}>

                <h1 className={styles.container} >{data.title}</h1>
                <h2 className={styles.container} >Posted at: {Date(data.created * 1000).toLocaleString()}</h2>
                <h2 className={styles.container} >Posted by: {data.author}</h2>

                <div className={styles.container}>
                    <div className={styles.videoContainer}>
                        <iframe src={data.media.reddit_video.fallback_url} title={data.title} width='100%' height='100%' />
                    </div>
                </div>

            </div>
        </div>
    )
}