import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectId, setAuthCode, setLoggedIn } from './logInSlice';
import { clientSecret } from './config';

export default function Callback() {

    const id = useSelector(selectId)
    const dispatch = useDispatch();

    const [reload, setReload] = useState(<></>);
    const [code, setCode] = useState('')

    const clientId = 'WbPqcAo0wBovDfBrv2kS7Q'

    useEffect(() => {

        const getAuthCode = async () => {
            const endpoint = 'https://www.reddit.com/api/v1/access_token'
            const uri = 'https://ssl-reddit-client.netlify.app/callback';

            try {
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({
                        'grant_type': 'authorization_code',
                        code: code,
                        redirect_uri: uri
                    })
                })
                if (response.ok) {
                    const data = await response.json();
                    dispatch(setAuthCode(data.access_token))
                    setReload(<Navigate to='/dashboard' />);
                }
            } catch {
                setReload(<Navigate to='/' />);
            }
        }

        if (window.location.href.includes(id)) {


            const url = window.location.href;
            const codeMatch = url.match(/[?&]code=([^&#]+)/);
            const code = codeMatch[1];
            setCode(code);

            dispatch(setLoggedIn(true));
            getAuthCode()
        } else {
            setReload(<Navigate to='/' />);
        }
    }, [id, code, dispatch])

    return (
        <>
            {reload}
        </>

    )
}