import { Request, Response, } from 'express';
import fetch from 'node-fetch';
import { UserReq } from '../../helpers/types';
import getUserHeroData from '../../helpers/heroInfo'
import { myCache } from "../../helpers/cache";


const spaces = async (req: Request, res: Response) => {
    try {

        const user: UserReq = (req.user !== undefined) ? req.user : res.status(500).json({
            status: "failure",
            msg: "there is a problem with user"
        });

        if (myCache.has("planetsKey")) {
            return res.status(200).json({
                status: 'success',
                spaces: await myCache.get("planetsKey"),
            });
        }

        const heroInfo = await getUserHeroData(user);

        let count: string[] = [];

        await fetch(`https://swapi.dev/api/planets/`)
            .then(res => res.json())
            .then(data => {

                for (let i = 0; i < data.results.length; i++) {
                    const el = data.results[i];

                    for (let index = 0; index < el.residents.length; index++) {
                        const element = el.residents[index];

                        if (element === heroInfo.url) {
                            count.push(el.name)
                        }
                    }
                }
                return data;

            })
            .catch(err => console.error(err));

        myCache.set("planetsKey", count, 86400);
        return res.status(200).json({
            status: 'success',
            planets: count,
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: `failure`,
            msg: "somthing goes wrong with planets"
        });
    }
}

export default spaces;