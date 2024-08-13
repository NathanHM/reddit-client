import PostPreview from "../post/preview/PostPreview";
import { v4 as uuidv4 } from "uuid";
import styles from './Dashboard.module.css';
import { useSelector, useDispatch } from "react-redux";
import { addPost, selectPosts } from "./dashboardSlice";
import { useEffect } from "react";
import loadingIcon from '../../imgs/spinner.png';
import loadingStyles from '../post/Loading.module.css';

export default function Dashboard() {

    const subs = [
        'MarvelStudiosSpoilers',
        'marvelstudios',
        'dccomics',
        'DC_Cinematic',
        'comicbooks',
        'Invincible',
        'Dimension20',
        'NotAnotherDnDPodcast',
        'Gallifrey',
        'Community',
        'masseffect'
    ]


    const dispatch = useDispatch();
    const postPreviews = useSelector(selectPosts);

    const hotScore = (ups, downs, users, seconds) => {
        let sign = 0;

        const order = Math.log(Math.max((Math.abs(ups - downs) / users), 1), 10)

        if (ups - downs > 0) {
            sign = 1;
        } else if (ups - downs < 0) {
            sign = -1;
        }

        return sign * order / seconds / 45000

    }

    const getSubData = async (subreddit) => {
        const data = await fetch('https://www.reddit.com/r/' + subreddit + '.json');
        const dataJson = await data.json();
        const about = await fetch('https://www.reddit.com/r/' + subreddit + '/about.json', {
            method: 'GET'
        });
        const aboutJson = await about.json();

        for (const child of dataJson.data.children) {

            child.data.score = hotScore(child.data.ups, child.data.downs, aboutJson.data.accounts_active, (Date.now() / 1000) - child.data.created)

        }

        return dataJson
    }

    const getData = async (sort) => {

        const posts = []

        for (const sub of subs) {
            const data = await getSubData(sub)
            for (const child of data.data.children) {
                posts.push(child)
            }
        }

        posts.sort((a, b) => b.data.score - a.data.score);

        for (const post of posts) {
            if (!post.data.pinned) {
                dispatch(addPost({ data: post.data, kind:post.kind, key: uuidv4() }))
            }
        }
    }

    useEffect(() => {
        if (postPreviews.length === 0) {
            getData();
        }
    });

    if (postPreviews.length === 0) {
        return (
            <div className={styles.container}>
                <div className={styles.dashboard}>
                <div className={loadingStyles.icon}>
                            <img src={loadingIcon} alt="loading"></img>
                        </div>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.dashboard}>
                <h1 className={styles.container}>Dashboard</h1>
                {postPreviews.slice(0, 50).map(post => <PostPreview data={post.data} kind={post.kind} key={post.key} />)}
            </div>
        </div>
    )
}