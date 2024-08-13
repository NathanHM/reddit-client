import styles from './Coments.module.css';
import Vote from '../vote/Vote';
import { v4 as uuidv4 } from "uuid";

export default function Comment({ data }) {

    if (data.kind === 'more') {
        return;
    }

    if (data.data.replies !== '') {
        return (
            <div className={styles.comment} >

                <Vote data={data.data} kind={data.kind} />

                <h1>{data.data.author}</h1>
                <h2>Points: {data.data.score}</h2>
                <h2>Time: {Date(data.data.created * 1000)}</h2>
                <p>{data.data.body}</p>


                {Object.values(data.data.replies.data.children).map(child => <Comment data={child} key={uuidv4()} />)}

            </div>
        )

    }

    return (
        <div className={styles.comment} >

            <Vote data={data.data} kind={data.kind} />


            <h1>{data.data.author}</h1>
            <h2>Points: {data.data.score}</h2>
            <h2>Time: {Date(data.data.created * 1000)}</h2>
            <p>{data.data.body}</p>

        </div>
    )

}