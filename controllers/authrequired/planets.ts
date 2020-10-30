import { Request, Response, } from 'express';
import fetch from 'node-fetch';
import { UserReq } from '../../helpers/types';
import getUserHeroData from '../../helpers/heroInfo'

const spaces = async (req: Request, res: Response) => {

    const user: UserReq = (req.user !== undefined) ? req.user : 'very secret string';

    if (user === 'very secret string') return res.status(500).json({
        status: 'failure',
        msg: 'somthing goes wrong with /authrequired/planets endpoint',
    });

    try {
        const heroInfo = await getUserHeroData(user);

        let acc: string[] = [];

        await fetch(`https://swapi.dev/api/planets/`)
            .then(res => res.json())
            .then(data => {

                for (let i = 0; i < data.results.length; i++) {
                    const el = data.results[i];

                    for (let index = 0; index < el.residents.length; index++) {
                        const element = el.residents[index];

                        if (element === heroInfo.url) {
                            acc.push(el.name)
                        }
                    }
                }
                return data;

            })
            .catch(err => console.log(err));

        console.log(acc);
        return res.status(200).json({
            status: 'succes',
            planets: acc,
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: `failure`,
            msg: "somthing goes wrong with planets"
        });
    }
}

export default spaces;