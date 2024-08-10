import styles from '../Post.module.css'
import { v4 as uuidv4 } from "uuid";

export default function Image({ data }) {
    return (
        <div className={styles.container}>
            <div className={styles.dashboard}>

                <h1 className={styles.container} >{data.title}</h1>
                <h2 className={styles.container} >Posted at: {Date(data.created * 1000).toLocaleString()}</h2>
                <h2 className={styles.container} >Posted by: {data.author}</h2>

                <div className={styles.container}>
                    <div className={styles.gallery} >
                        <div className={styles.imageContainer} >
                            <img className={styles.img} src={data.preview.images[0].source.url.replace('preview', 'i')} alt="" key={uuidv4()} />
                        </div>
                        {data.selftext}
                    </div>
                </div>
            </div>
        </div>
    )
}