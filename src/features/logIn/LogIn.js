import { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid";
import queryString from 'query-string';
import { getId, setId } from "./logInSlice";
import { useDispatch, useSelector } from "react-redux";

export default function LogIn() {

    const dispatch = useDispatch();
    let state = ''
    const id = useSelector(getId)
    if (!id) {
        state = uuidv4();
        dispatch(setId(state))
    }
    else {
        state = id;
    }
    const clientId = 'WbPqcAo0wBovDfBrv2kS7Q';
    const uri = 'http://localhost:3000/';
    const scope = 'identity edit save submit read history'
    const endpoint = 'https://www.reddit.com/api/v1/authorize?'

    const parameters = queryString.stringify({
        'client_id': clientId,
        'response_type': 'code',
        'state': state,
        'redirect_uri': uri,
        'duration': 'permanent',
        'scope': scope
    })

    const [authCode, setAuthCode] = useState('');
    const [button, setButton] = useState(<a href={endpoint + parameters}>Log In</a>)

    useEffect(() => {
        if (window.location.href.includes(state)) {
            setAuthCode(window.location.href.slice(71));
            setButton(<p>Signed In As:</p>)
        }
    }, [authCode, state])


    return (
        <>
            {button}
            <p>{authCode}</p>
        </>
    )
}