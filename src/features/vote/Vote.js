import styles from './Vote.module.css';
import upvoteIcon from '../../imgs/arrow-alt-circle-up.png'
import downvoteIcon from '../../imgs/arrow-alt-circle-down.png'
import { useDispatch, useSelector } from 'react-redux';

import { selectVotes, selectVote, addVote, upvote, downvote } from './voteSlice';
import { useEffect, useState } from 'react';

export default function Vote({ data, kind }) {

    const id = data.id;
    const upvotes = data.ups;

    const dispatch = useDispatch();
    const votes = useSelector(selectVotes);

    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false);

    const vote = useSelector(selectVote(kind + '_' + id));
    useEffect(() => {
        if (vote) {
            setUpvoted(vote.upvoted);
            setDownvoted(vote.downvoted);
        }
    }, [vote, upvoted, downvoted, id])

    const handleUpvote = () => {
        if (!votes.map(el => el.id).includes(kind + '_' + id)) {
            dispatch(addVote({id: kind + '_' + id, upvoted: true, downvoted: false}))
        } else {
            setUpvoted(true)
            dispatch(upvote(kind + '_' + id));
        }
    }

    const handleDownvote = () => {
        if (!votes.map(el => el.id).includes(kind + '_' + id)) {
            dispatch(addVote({id: kind + '_' + id, upvoted: true, downvoted: false}))
        } else {
            setDownvoted(true)
            dispatch(downvote(kind + '_' + id));
        }
    }

    return (

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

    )

}