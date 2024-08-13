import styles from './PostPreview.module.css';
import upvoteIcon from '../../../imgs/arrow-alt-circle-up.png'
import downvoteIcon from '../../../imgs/arrow-alt-circle-down.png'
import commentIcon from '../../../imgs/comment-alt-middle.png'
import permalinkIcon from '../../../imgs/arrow-up-right-from-square.png'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectDownvoted, selectUpvoted, setDownvoted, setUpvoted } from '../../dashboard/dashboardSlice.js';
import thumbnailDefault from '../../../imgs/text.png'
import spoilerIcon from '../../../imgs/exclamation.png'

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
    let thumbnail = <></>

    const upvoted = useSelector(selectUpvoted(id));
    const downvoted = useSelector(selectDownvoted(id))
    const dispatch = useDispatch();

    if (data.thumbnail === 'self') {
        thumbnail = <img src={thumbnailDefault} alt='self-post' id={styles.icon} ></img>
    } else if (data.thumbnail === 'spoiler') {
        thumbnail = <img src={spoilerIcon} alt='spoiler' id={styles.icon} ></img>
    } else if (data.thumbnail === 'nsfw') {
        thumbnail = <img src={spoilerIcon} alt='nsfw' id={styles.icon} ></img>
    } else {
        if (data.thumbnail.includes('external-preview')) {
            thumbnail = <img src={data.thumbnail.replace('external-preview', 'i')} alt='thumbnail' ></img>
        } else if (data.thumbnail.includes('preview')) {
            thumbnail = <img src={data.thumbnail.replace('preview', 'i')} alt='thumbnail' ></img>
        } else {
            thumbnail = <img src={data.thumbnail} alt='thumbnail' ></img>
        }
    }

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

    console.log(data)

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

            <div className={styles.thumbnail}>
                <div className={styles.imgContainer}>
                    {thumbnail}
                </div>
            </div>


            <div className={styles.details} >
                <div className={styles.spaceBetween}>
                    <h4>{domain}</h4>
                    <h4>{subreddit} : {flair}</h4>
                </div>


                {link ?
                    <Link
                        key={id}
                        to={data.url}
                        target='_blank'
                        className={styles.link}
                    >
                        <h1>{title}</h1>
                    </Link>
                    :
                    <Link
                        key={id}
                        to={`/${subreddit}/${id}`}
                        data={postData}
                        className={styles.link}
                    >
                        <h1>{title}</h1>
                    </Link>
                }


                <div className={styles.section} >
                    <h2>{author}</h2>
                    <h2>{date.toLocaleDateString('en-UK')} : {date.toLocaleTimeString('en-UK')} </h2>
                </div>
                <div className={styles.section} >
                    <div className={styles.bar} >
                        <div className={styles.commentsSection}>
                            <Link
                                key={id}
                                to={`/${subreddit}/${id}`}
                                data={postData}
                                className={styles.link}
                            >
                                <div className={styles.section} >
                                    <img src={commentIcon} alt='comment' />
                                    <h3>
                                        {num_comments}
                                    </h3>
                                </div>

                            </Link>

                        </div>

                        <a href={'https://old.reddit.com' + permalink} target='_blank' rel="noreferrer"> <img src={permalinkIcon} alt='permalink' /> </a>

                    </div>
                </div>


            </div>
        </div >
    )

}