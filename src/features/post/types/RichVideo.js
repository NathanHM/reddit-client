import styles from '../Post.module.css'

export default function RichVideo({ data }) {

    const regex = /src="([^"]+)"/;
    const match = data.secure_media.oembed.html.match(regex);
    const url = match[1];

    return (
        <div className={styles.container}>
            <div className={styles.videoContainer}>
                <iframe src={url} title={data.secure_media.oembed.title} width='100%' height='100%' />
            </div>
        </div>
    )
}