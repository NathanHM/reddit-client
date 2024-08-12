import styles from './PostPreview.module.css';
import upvoteIcon from '../../../imgs/arrow-alt-circle-up.png'
import downvoteIcon from '../../../imgs/arrow-alt-circle-down.png'
import commentIcon from '../../../imgs/comment-alt-middle.png'
import permalinkIcon from '../../../imgs/arrow-up-right-from-square.png'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectDownvoted, selectUpvoted, setDownvoted, setUpvoted } from '../../dashboard/dashboardSlice.js';

export default function PostPreview({ data }) {

    const author = data.author;
    const title = data.title;
    const subreddit = data.subreddit;
    const permalink = data.permalink;
    const id = data.id;
    const upvotes = data.ups;
    const time = data.created_utc
    const date = new Date(time * 1000)
    const link = data.post_hint === 'link'
    const domain = data.domain;
    const flair = data.link_flair_text;
    const num_comments = data.num_comments

    const upvoted = useSelector(selectUpvoted(id));
    const downvoted = useSelector(selectDownvoted(id))
    const dispatch = useDispatch();

    const postData = {
        subreddit, id
    }

    const handleUpvote = () => {
        dispatch(setUpvoted({ bool: true, id: id }));
        dispatch(setDownvoted({ bool: false, id: id }));
    }

    const handleDownvote = () => {
        dispatch(setUpvoted({ bool: false, id: id }));
        dispatch(setDownvoted({ bool: true, id: id }));
    }

    return (
        <div className={styles.post}>
            <div className={styles.pointsContainer} >
                <div className={styles.points} >
                    <button className={styles.container} onClick={handleUpvote} disabled={upvoted}>
                        <img src={upvoteIcon} alt='upvote' />
                    </button>
                    <p className={styles.container}>{upvotes}</p>
                    <button className={styles.container} onClick={handleDownvote} disabled={downvoted}>
                        <img src={downvoteIcon} alt='downvote' />
                    </button>
                </div>
            </div>


            <div className={styles.details} >

                {link ?
                    <Link
                        key={id}
                        to={data.url}
                        target='_blank'
                        className={styles.link}
                    >
                        <h1 className={styles.container}>{title}</h1>
                    </Link>
                    :
                    <Link
                        key={id}
                        to={`/${subreddit}/${id}`}
                        data={postData}
                        className={styles.link}
                    >
                        <h1 className={styles.container}>{title}</h1>
                    </Link>
                }


                <div className={styles.section} >
                    <h2>{author}</h2>
                    <h2>{date.toLocaleDateString('en-UK')} : {date.toLocaleTimeString('en-UK')} </h2>
                    <h2>{subreddit}</h2>
                </div>
                <div className={styles.section} >
                    <div className={styles.bar} >
                        <div className={styles.commentsSection}>
                            <img src={commentIcon} alt='comment' />
                            <h3>
                                {num_comments}
                            </h3>
                        </div>

                        <a href={'https://old.reddit.com' + permalink} target='_blank' rel="noreferrer"> <img src={permalinkIcon} alt='permalink' /> </a>

                    </div>
                </div>


            </div>
        </div >
    )

}