import styles from '../Post.module.css'

export default function Text({ data }) {
    return (
        <p>{data.selftext}</p>
    )
}