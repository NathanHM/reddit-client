import styles from '../Post.module.css'
import { v4 as uuidv4 } from "uuid";

export default function Image({ data }) {
    return (
        <div className={styles.container}>
            <div className={styles.gallery} >
                <div className={styles.imageContainer} >
                    <img className={styles.img} src={data.preview.images[0].source.url.replace('preview', 'i')} alt="" key={uuidv4()} />
                </div>
                {data.selftext}
            </div>
        </div>
    )
}