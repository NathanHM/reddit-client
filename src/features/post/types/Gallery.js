import styles from '../Post.module.css'
import { v4 as uuidv4 } from "uuid";

export default function Gallery({ data }) {
    return (
        <div className={styles.container}>
        <div className={styles.dashboard}>

            <h1 className={styles.container} >{data.title}</h1>
            <h2 className={styles.container} >Posted at: {Date(data.created * 1000).toLocaleString()}</h2>
            <h2 className={styles.container} >Posted by: {data.author}</h2>

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

        </div>
    </div>
    )
}