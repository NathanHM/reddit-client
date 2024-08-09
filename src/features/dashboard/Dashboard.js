import { useState } from "react";
import PostPreview from "../post/preview/PostPreview";
import { v4 as uuidv4 } from "uuid";
import styles from './Dashboard.module.css';

export default function Dashboard() {

    const subs = [
        'MarvelStudiosSpoilers',
        'marvelstudios',
        'dccomics',
        'comicbooks'
    ]

    const [previews, setPreviews] = useState([]);

    const getSubData = async (subreddit) => {
        const data = await fetch('https://www.reddit.com/r/' + subreddit + '.json');
        const dataJson = await data.json();
        const about = await fetch('https://www.reddit.com/r/' + subreddit + '/about.json', {
            method: 'GET'
        });
        const aboutJson = await about.json();

        for (const child of dataJson.data.children) {
            let power = 0

            if ((child.data.ups - child.data.downs) !== 0) {
                power = Math.abs(child.data.ups - child.data.downs) / aboutJson.data.accounts_active
            }

            child.data.score = Math.log((power + (((Date.now() / 1000) - child.data.created) / 45000)), 10)
            console.log(child.data.score)
        }

        return dataJson
    }

    const getData = async () => {

        const posts = []

        for (const sub of subs) {
            const data = await getSubData(sub)
            for (const child of data.data.children) {
                posts.push(child)
            }
        }

        posts.sort((a, b) => b.data.score - a.data.score);

        for (const post of posts) {
            setPreviews(prev => [...prev, <PostPreview data={post.data} key={uuidv4()} />])
        }
    }

    if (previews.length === 0) {
        getData()
        return (
            <div className={styles.container} onLoad={getData}>
                <div className={styles.dashboard} onLoad={getData}>
                    <p className={styles.container}>Loading...</p>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.container} onLoad={getData}>
            <div className={styles.dashboard} onLoad={getData}>
                <h1 className={styles.container}>Dashboard</h1>
                {previews}
            </div>
        </div>
    )
}