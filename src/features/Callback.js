import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectId, setAuthCode } from './logIn/logInSlice';

export default function Callback() {

    const id = useSelector(selectId)
    const dispatch = useDispatch();

    const [reload, setReload] = useState(<></>);

    useEffect(() => {
        console.log('hey1')
        console.log(id)
        console.log(window.location.href)
        console.assert(window.location.href.includes(id));
        if (window.location.href.includes(id)) {
            console.log('hey2')
            dispatch(setAuthCode(window.location.href.slice(79)));
            setReload(<Navigate to='/' />)
        }
    }, [id, dispatch])

    return (
        <>
            {reload}
        </>

    )
}