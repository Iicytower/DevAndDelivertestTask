import { Request, response, Response, } from 'express';
import { UserReq } from '../../helpers/types';
import fetch from 'node-fetch'
import getUserHeroData from '../../helpers/heroInfo'

const films = async (req: Request, res: Response) => {

    const user: UserReq = (req.user !== undefined) ? req.user : 'very secret string';

    if (user === 'very secret string') return res.status(500).json({
        status: 'failure',
        msg: 'somthing goes wrong with /authrequired/films endpoint',
    });

    try {
        const heroInfo = await getUserHeroData(user);

        const films: string[] = [
            "A New Hope",
            "The Empire Strikes Back",
            "Return of the Jedi",
            "The Phantom Menace",
            "Attack of the Clones",
            "Revenge of the Sith",
        ];
        
        const count: string = heroInfo.films.reduce((acc: string[], cur: string) => {
            acc.push(films[parseInt(cur.charAt(27)) - 1]);
            return acc
        }, []);

        return res.status(200).json({
            status: 'succes',
            films: count,
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: `failure`,
            msg: "somthing goes wrong with films"
        });
    }
}

export default films;