import styles from './PostPreview.module.css';
import subStyles from '../SubStyles.module.css';
import commentIcon from '../../../imgs/comment-alt-middle.png'
import permalinkIcon from '../../../imgs/arrow-up-right-from-square.png'
import { Link } from 'react-router-dom';
import thumbnailDefault from '../../../imgs/text.png'
import spoilerIcon from '../../../imgs/exclamation.png'
import Vote from '../../vote/Vote.js';
import { formatCharacters } from '../../../utilities.js';

export default function PostPreview({ data, kind }) {

    const author = data.author;
    const title = data.title;
    const subreddit = data.subreddit;
    const permalink = data.permalink;
    const id = data.id;
    const time = data.created_utc
    const date = new Date(time * 1000)
    const link = data.post_hint === 'link'
    const domain = data.domain;
    const flair = data.link_flair_text;
    const num_comments = data.num_comments
    let thumbnail = <></>


    if (data.thumbnail === 'self' || data.thumbnail === '') {
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

    return (
        <div className={styles.container}>
            <div className={styles.spaceBetween}>
                <h4>{domain}</h4>
                <h4 className={subStyles[subreddit]}>{subreddit} : {formatCharacters(flair)}</h4>
            </div>
            <div className={styles.post}>

                <Vote data={data} kind={kind} />

                <div className={styles.thumbnail}>
                    <div className={styles.imgContainer}>
                        {thumbnail}
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
                            <h1>{formatCharacters(title)}</h1>
                        </Link>
                        :
                        <Link
                            key={id}
                            to={`/${subreddit}/${id}`}
                            data={postData}
                            className={styles.link}
                        >
                            <h1>{formatCharacters(title)}</h1>
                        </Link>
                    }


                    <div className={styles.section} >
                        <h2><a href={'https://old.reddit.com/u/' + author} target='_blank' rel="noreferrer">{author}</a></h2>
                        <h2>{date.toLocaleDateString('en-UK')} : {date.toLocaleTimeString('en-UK')} </h2>
                    </div>
                    <div className={styles.section} >

                    </div>



                </div>
            </div >
            <div className={styles.bar} >
                <div className={styles.commentsSection}>
                    <Link
                        key={id}
                        to={`/${subreddit}/${id}`}
                        data={postData}
                        className={styles.link}
                    >
                        <div className={styles.section} >
                            <div className={styles.iconContainer}>
                                <div className={styles.imgContainer}>
                                    <img src={commentIcon} alt='comment' />
                                </div>

                            </div>
                            <h4>
                                {num_comments}
                            </h4>
                        </div>

                    </Link>

                </div>

                <a href={'https://old.reddit.com' + permalink} target='_blank' rel="noreferrer">
                    <div className={styles.iconContainer}>
                        <div className={styles.imgContainer}>
                            <img src={permalinkIcon} alt='permalink' />
                        </div>
                    </div>
                </a>

            </div>
        </div>

    )

}