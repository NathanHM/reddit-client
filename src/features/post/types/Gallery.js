import styles from '../Post.module.css'
import { v4 as uuidv4 } from "uuid";

export default function Gallery({ data }) {
    return (
        <div className={styles.container}>
            <div className={styles.gallery} >
                {Object.values(data.media_metadata).map(
                    image =>
                        <div className={styles.imageContainer} >
                            <img className={styles.img} src={image.s.u.replace('preview', 'i')} alt="" key={uuidv4()} />
                        </div>
                )}
            </div>
        </div>
    )
}