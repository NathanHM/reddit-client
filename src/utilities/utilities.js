import { useNavigate } from "react-router";

const clientSecret = 'G6Rd-ByT7oe0xg7no5naX6wxupvprw';

export const recieveToken = state => {


    const clientID = 'WbPqcAo0wBovDfBrv2kS7Q';
    const uri = 'http://localhost:3000/';
    const scope = 'identity edit save submit read history'
    const endpoint = 'https://www.reddit.com/api/v1/authorize?'

    const parameters = JSON.stringify({
        'client_id': clientID,
        'response_type': 'code',
        'state': state,
        'redirect_uri': uri,
        'duration': 'permanent',
        'scope': scope
    })

}