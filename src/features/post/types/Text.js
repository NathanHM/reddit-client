import styles from '../Post.module.css'

export default function Text({ data }) {
    return (
        <div className={styles.container}>
        <div className={styles.dashboard}>

            <h1 className={styles.container} >{data.title}</h1>
            <h2 className={styles.container} >Posted at: {Date(data.created * 1000)}</h2>
            <h2 className={styles.container} >Posted by: {data.author}</h2>

            <p>{data.selftext}</p>

        </div>
    </div>
    )
}