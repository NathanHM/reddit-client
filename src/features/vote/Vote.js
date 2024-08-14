import styles from './Vote.module.css';
import upvoteIcon from '../../imgs/arrow-alt-circle-up.png'
import downvoteIcon from '../../imgs/arrow-alt-circle-down.png'
import { useDispatch, useSelector } from 'react-redux';

import { selectVotes, selectVote, addVote, upvote, downvote } from './voteSlice';
import { useEffect, useState } from 'react';
import { selectAuthCode } from '../logIn/logInSlice';

export default function Vote({ data, kind }) {

    const id = data.id;
    const upvotes = data.ups;

    const dispatch = useDispatch();
    const votes = useSelector(selectVotes);
    const authCode = useSelector(selectAuthCode)

    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false);

    const vote = useSelector(selectVote(kind + '_' + id));
    useEffect(() => {
        if (vote) {
            setUpvoted(vote.upvoted);
            setDownvoted(vote.downvoted);
        }
    }, [vote, upvoted, downvoted, id])

    const sendVote = async (dir) => {
        const endpoint = 'https://oauth.reddit.com/api/vote';

        try {
            await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + authCode,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    id: kind + '_' + id,
                    dir: dir
                })
            })
        } catch {
            console.log('oops no fetch')
        }
    }

    const handleUpvote = () => {
        if (!votes.map(el => el.id).includes(kind + '_' + id)) {
            dispatch(addVote({ id: kind + '_' + id, upvoted: true, downvoted: false }))
            sendVote(1)
        } else {
            if (upvoted) {
                sendVote(0)
            } else {
                sendVote(1)
            }
            dispatch(upvote({ id: kind + '_' + id, bool: !upvoted }));
        }
    }

    const handleDownvote = () => {
        if (!votes.map(el => el.id).includes(kind + '_' + id)) {
            dispatch(addVote({ id: kind + '_' + id, upvoted: true, downvoted: false }))
            sendVote(-1)
        } else {
            if (downvoted) {
                sendVote(0)
            } else {
                sendVote(-1)
            }
            dispatch(downvote({ id: kind + '_' + id, bool: !downvoted }));
        }
    }

    return (

        <div className={styles.pointsContainer} >
            <div className={styles.points} >
                <button className={`${upvoted ? styles.active : ''}`} onClick={handleUpvote}>
                    <img src={upvoteIcon} alt='upvote' />
                </button>
                <p className={styles.container}>{upvotes}</p>
                <button className={`${downvoted ? styles.active : ''}`} onClick={handleDownvote}>
                    <img src={downvoteIcon} alt='downvote' />
                </button>
            </div>
        </div>

    )

}