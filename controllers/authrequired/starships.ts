import { Request, Response, } from 'express';
import fetch from 'node-fetch';

import { UserReq } from '../../helpers/types';
import getUserHeroData from '../../helpers/heroInfo'

const vehicles = async (req: Request, res: Response) => {

    const user: UserReq = (req.user !== undefined) ? req.user : res.status(500).json({
        status: "failure",
        msg: "there is a problem with user"
    });

    try {
        const heroInfo = await getUserHeroData(user);

        let count: string[] = [];
        for(let i = 0; i < heroInfo.starships.length; i++) {
            const el: string = heroInfo.starships[i];

            await fetch(el)
            .then(res => res.json())
            .then(data => {
                count.push(data.name);
                return data.name
            })
            .catch(err => console.error(err));
        }

        return res.status(200).json({
            status: 'succes',
            spaces: count,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: `failure`,
            msg: "somthing goes wrong with starships"
        });
    }
}

export default vehicles;