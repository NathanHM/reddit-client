import styles from '../Post.module.css'
import { v4 as uuidv4 } from "uuid";
import format from "../../../utilities"

export default function Gallery({ data }) {
    return (
        <div className={styles.container}>
            <div className={styles.gallery} >
                {Object.values(data.media_metadata).map(
                    image =>
                        <div className={styles.imageContainer} key={uuidv4()}>
                            <img className={styles.img} src={image.s.u.replace('preview', 'i')} alt="" key={uuidv4()} />
                        </div>
                )}
                <div dangerouslySetInnerHTML={{ __html: format(data.selftext) }} />
            </div>
        </div>
    )
}