import { Request, Response, } from 'express';
import fetch from 'node-fetch';

import { UserReq } from '../../helpers/types';
import getUserHeroData from '../../helpers/heroInfo';
import { myCache } from "../../helpers/cache";


const vehicles = async (req: Request, res: Response) => {
    try {

        const user: UserReq = (req.user !== undefined) ? req.user : res.status(500).json({
            status: "failure",
            msg: "there is a problem with user"
        });

        if (myCache.has("vehiclesKey")) {
            return res.status(200).json({
                status: 'success,
                spaces: await myCache.get("vehiclesKey"),
            });
        }

        const heroInfo = await getUserHeroData(user);

        let count: string[] = [];
        for (let i = 0; i < heroInfo.vehicles.length; i++) {
            const el: string = heroInfo.vehicles[i];

            await fetch(el)
                .then(res => res.json())
                .then(data => {
                    count.push(data.name);
                    return data.name
                })
                .catch(err => console.error(err));
        }

        myCache.set("vehiclesKey", count, 86400);
        return res.status(200).json({
            status: 'success,
            vehicles: count,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: `failure`,
            msg: "somthing goes wrong with vehicles"
        });
    }
}

export default vehicles;