import { Request, response, Response, } from 'express';
import fetch from 'node-fetch';
import { UserReq } from '../../helpers/types';
import getUserHeroData from '../../helpers/heroInfo'

const spaces = async (req: Request, res: Response) => {

    const user: UserReq = (req.user !== undefined) ? req.user : 'very secret string';

    if (user === 'very secret string') return res.status(500).json({
        status: 'failure',
        msg: 'somthing goes wrong with /authrequired/spaces endpoint',
    });

    try {
        const heroInfo = await getUserHeroData(user);
        const count: string[] = await heroInfo.species.reduce(async (acc: string[], cur: string) => {
            await fetch(cur)
                .then(res => res.json())
                .then(data => {
                    acc.push(data.name)
                    return data.name;
                })
                .catch(err => console.log(err));
            return acc
        }, []);
        return res.status(200).json({
            status: 'succes',
            spaces: count,
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: `failure`,
            msg: "somthing goes wrong with spaces"
        });
    }
}

export default spaces;