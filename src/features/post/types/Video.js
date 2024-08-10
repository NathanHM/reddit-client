import styles from '../Post.module.css'

export default function Video({ data }) {
    return (
        <div className={styles.container}>
            <div className={styles.videoContainer}>
                <iframe src={data.media.reddit_video.fallback_url} title={data.title} width='100%' height='100%' />
            </div>
        </div>
    )
}