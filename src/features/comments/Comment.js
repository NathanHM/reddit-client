import styles from './Coments.module.css';

export default function Comment({ data }) {

    if(data.kind === 'more') {
        return;
    }

    console.log(data.data)

    if (data.data.replies !== '') {
        return (
            <div className={styles.comment} >

                <h1>{data.data.author}</h1>
                <h2>Points: {data.data.score}</h2>
                <h2>Time: {Date(data.data.created * 1000)}</h2>
                <p>{data.data.body}</p>


                {Object.values(data.data.replies.data.children).map(child => <Comment data={child} key={child.id} />)}

            </div>
        )

    }

    return (
        <div className={styles.comment} >

            <h1>{data.data.author}</h1>
            <h2>Points: {data.data.score}</h2>
            <h2>Time: {Date(data.data.created * 1000)}</h2>
            <p>{data.data.body}</p>

        </div>
    )

}