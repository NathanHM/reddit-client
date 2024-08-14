import styles from './Coments.module.css';
import Vote from '../vote/Vote';
import { v4 as uuidv4 } from "uuid";
import { formatCharacters, formatText } from '../../utilities';

export default function Comment({ data }) {

    const author = data.data.author;
    const date = new Date(data.data.created * 1000);

    if (data.kind === 'more') {
        return;
    }

    if (data.data.replies !== '') {
        return (
            <div>
                <div className={styles.comment} >
                    <div className={styles.commentContainer}>

                        <Vote data={data.data} kind={data.kind} />

                        <div className={styles.details}>

                            <h1><a href={'https://old.reddit.com/u/' + author} target='_blank' rel="noreferrer">{author}</a></h1>
                            <h2>{date.toLocaleDateString('en-UK')} : {date.toLocaleTimeString('en-UK')} </h2>

                            <div className={styles.commentContent}>
                                <p>{formatText(formatCharacters(data.data.body))}</p>
                            </div>

                        </div>
                    </div>

                    {Object.values(data.data.replies.data.children).map(child => <Comment data={child} key={uuidv4()} />)}

                </div>
            </div>

        )

    }

    return (
        <div className={styles.comment} >
            <div className={styles.commentContainer}>

                <Vote data={data.data} kind={data.kind} />

                <div className={styles.details}>

                    <h1><a href={'https://old.reddit.com/u/' + author} target='_blank' rel="noreferrer">{author}</a></h1>
                    <h2>{date.toLocaleDateString('en-UK')} : {date.toLocaleTimeString('en-UK')} </h2>

                    <div className={styles.commentContent}>
                        <p>{formatText(formatCharacters(data.data.body))}</p>
                    </div>

                </div>
            </div>
        </div>
    )

}