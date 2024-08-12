import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectId, setAuthCode, setLoggedIn } from './logInSlice';

export default function Callback() {

    const id = useSelector(selectId)
    const dispatch = useDispatch();

    const [reload, setReload] = useState(<></>);

    useEffect(() => {
        if (window.location.href.includes(id)) {
            dispatch(setAuthCode(window.location.href.slice(79)));
            dispatch(setLoggedIn(true));
            setReload(<Navigate to='/dashboard' />);
        } else {
            setReload(<Navigate to='/' />);
        }
    }, [id, dispatch])

    return (
        <>
            {reload}
        </>

    )
}