import styles from './Vote.module.css';
import upvoteIcon from '../../imgs/arrow-alt-circle-up.png'
import downvoteIcon from '../../imgs/arrow-alt-circle-down.png'
import { useDispatch, useSelector } from 'react-redux';
import { selectDownvoted, selectUpvoted, setDownvoted, setUpvoted } from '../dashboard/dashboardSlice.js';

export default function Vote({ data }) {

    const id = data.id;
    const upvotes = data.ups;

    const upvoted = useSelector(selectUpvoted(id));
    const downvoted = useSelector(selectDownvoted(id))
    const dispatch = useDispatch();

    const handleUpvote = () => {
        dispatch(setUpvoted({ bool: true, id: id }));
        dispatch(setDownvoted({ bool: false, id: id }));
    }

    const handleDownvote = () => {
        dispatch(setUpvoted({ bool: false, id: id }));
        dispatch(setDownvoted({ bool: true, id: id }));
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