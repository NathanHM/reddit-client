import styles from '../Post.module.css'
import { formatText, formatCharacters } from "../../../utilities"

export default function Video({ data }) {
    return (
        <div className={styles.container}>
            <div className={styles.videoContainer}>
                <iframe src={data.media.reddit_video.fallback_url} title={data.title} width='100%' height='100%' />
            </div>
            <p>{formatText(formatCharacters(data.selftext))}</p>
        </div>
    )
}