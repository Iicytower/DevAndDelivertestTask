import { Request, Response, } from 'express';
import { UserReq } from '../../helpers/types';
import getUserHeroData from '../../helpers/heroInfo'
import fetch from "node-fetch";
import NodeCache from "node-cache";

const films = async (req: Request, res: Response) => {

    const user: UserReq = (req.user !== undefined) ? req.user : res.status(500).json({
        status: "failure",
        msg: "there is a problem with user"
    });

    let myCache: NodeCache = new NodeCache({
        stdTTL: 86400, //24h
        useClones: true,
        checkperiod: 86400, //24h
        deleteOnExpire: false,
    });

    // console.log(myCache.has("filmsKey"));
    console.log(myCache.get("filmsKey"));
    console.log('////////////////////////////////////////');

    if(myCache.has("filmsKey")){

        const count = await myCache.get("filmsKey");
        console.log("in if: \n", count);
        return res.status(200).json({
            status: 'succes',
            spaces: count,
        });
    }

    try {
        const heroInfo = await getUserHeroData(user);

        const count: string[] = [];
        for(let i = 0; i < heroInfo.films.length; i++) {
            const el: string = heroInfo.films[i];

            await fetch(el)
            .then(res => res.json())
            .then(data => {
                count.push(data.title);
                return data.title
            })
            .catch(err => console.error(err));
        }
        
        myCache.set("filmsKey", count, 86400)

        console.log("end: \n",myCache.get("filmsKey"));
        
        console.log('++++++++++++++++++++++++++++++++++++');

        return res.status(200).json({
            status: 'succes',
            spaces: count,
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