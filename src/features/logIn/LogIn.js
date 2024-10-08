import { v4 as uuidv4 } from "uuid";
import queryString from 'query-string';
import { selectId, setId } from "./logInSlice";
import { useDispatch, useSelector } from "react-redux";
import styles from './LogIn.module.css'

export default function LogIn() {

    const dispatch = useDispatch();
    let state = ''
    const id = useSelector(selectId)
    if (!id) {
        state = uuidv4();
        dispatch(setId(state))
    }
    else {
        state = id;
    }
    const clientId = 'WbPqcAo0wBovDfBrv2kS7Q';
    const uri = 'https://ssl-reddit-client.netlify.app/callback';
    const scope = 'identity edit vote save submit read history'
    const endpoint = 'https://www.reddit.com/api/v1/authorize?'

    const parameters = queryString.stringify({
        'client_id': clientId,
        'response_type': 'code',
        'state': state,
        'redirect_uri': uri,
        'duration': 'permanent',
        'scope': scope
    })

    return (
        <nav>
            <div className={styles.logIn}>
                <a href={endpoint + parameters}>Log In</a>
            </div>
        </nav>

    )
}