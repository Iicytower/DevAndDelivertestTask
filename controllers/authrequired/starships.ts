import { Request, Response, } from 'express';
import fetch from 'node-fetch';

import { UserReq } from '../../helpers/types';
import getUserHeroData from '../../helpers/heroInfo'

const vehicles = async (req: Request, res: Response) => {

    const user: UserReq = (req.user !== undefined) ? req.user : 'very secret string';

    if (user === 'very secret string') return res.status(500).json({
        status: 'failure',
        msg: 'somthing goes wrong with /authrequired/vehicles endpoint',
    });

    try {
        const heroInfo = await getUserHeroData(user);

        let acc: string[] = [];
        for(let i = 0; i < heroInfo.starships.length; i++) {
            const el: string = heroInfo.starships[i];

            await fetch(el)
            .then(res => res.json())
            .then(data => {
                acc.push(data.name);
                return data.name
            })
            .catch(err => console.log(err));
        }

        return res.status(200).json({
            status: 'succes',
            spaces: acc,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: `failure`,
            msg: "somthing goes wrong with vehicles"
        });
    }
}

export default vehicles;