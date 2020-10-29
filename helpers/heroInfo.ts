import fetch from 'node-fetch'
import { UserReq } from './types';


export default async(user: UserReq) => {

    const { characterSW } = user;
    const baseURL: string = `https://swapi.dev/api/people/${characterSW}`;
    
    const charInfo = await fetch(baseURL)
        .then(res => res.json())
        .then(data => data)
        .catch(err => console.log(err));
    
    return charInfo;

}
