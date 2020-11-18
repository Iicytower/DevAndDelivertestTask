import { Request, Response, } from 'express';
import { UserReq } from '../../helpers/types';
import getUserHeroData from '../../helpers/heroInfo'
import fetch from "node-fetch";
import { myCache } from "../../helpers/cache";

const films = async (req: Request, res: Response) => {

    try {
    
        const user: UserReq = (req.user !== undefined) ? req.user : res.status(500).json({
            status: "failure",
            msg: "there is a problem with user"
        });
    
        if (myCache.has("filmsKey")) {
            return res.status(200).json({
                status: 'success',
                films: await myCache.get("filmsKey"),
            });
        }

        const heroInfo = await getUserHeroData(user);

        const count: string[] = [];
        for (let i = 0; i < heroInfo.films.length; i++) {
            const el: string = heroInfo.films[i];

            await fetch(el)
                .then(res => res.json())
                .then(data => {
                    count.push(data.title);
                    return data.title
                })
                .catch(err => console.error(err));
        }

        myCache.set("filmsKey", count, 86400);

        return res.status(200).json({
            status: 'success',
            films: count,
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: `failure`,
            msg: "somthing goes wrong with films"
        });
    }
}

export default films;