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
    const [posts, setPosts] = useState([]);
    const [previews, setPreviews] = useState([]);

    const getSubData = async (subreddit) => {
        const data = await fetch('https://www.reddit.com/r/' + subreddit + '.json');
        const json = await data.json();
        return json
    }

    const getData = async () => {
        for await (const sub of subs) {
            const data = await getSubData(sub)
            setPosts(prev => prev.concat(data.data.children.slice(0, 10)))
        }
        for (const post of posts) {
            console.log(post)
            setPreviews(prev => prev.concat(<PostPreview data={post.data} key={uuidv4()} />))
        }

    }

    return (
        <div className={styles.container} onLoad={getData}>
            <div className={styles.dashboard} onLoad={getData}>
                <h1 className={styles.container}>Dashboard</h1>
                <button onClick={getData} className={styles.container}>Load</button>
                {previews}
            </div>
        </div>
    )
}