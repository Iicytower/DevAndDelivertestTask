import { Request, response, Response, } from 'express';
import fetch from 'node-fetch';
import { UserReq, specificID } from '../../helpers/types';
import getUserHeroData from '../../helpers/heroInfo';
import { myCache } from "../../helpers/cache";

const specificID = async (req: Request, res: Response) => {

    try {
        const user: UserReq = (req.user !== undefined) ? req.user : res.status(500).json({
            status: "failure",
            msg: "there is a problem with user"
        });

        const idReq: specificID = (req.body !== undefined) ? req.body : res.status(500).json({
            status: "failure",
            msg: "there is a problem with user"
        });
        const heroInfo = await getUserHeroData(user);

        const count: string[] = [];
        const id: number[] = []
        switch (idReq.resource) {
            case 'films':
                heroInfo.films.forEach((el: string) => {
                    const heroFilmsID = el.split('/');
                    id.push(parseInt(heroFilmsID[heroFilmsID.length - 2]));
                });

                for (let i = 0; i < id.length; i++) {
                    const el = id[i];
                    if (el === idReq.films) {

                        await fetch(`https://swapi.dev/api/films/${idReq.films}/`)
                            .then(res => res.json())
                            .then(data => {
                                count.push(data.title);
                                return data.title
                            })
                            .catch(err => console.error(err));

                        return res.status(200).json({
                            status: `success`,
                            films: count,
                        });
                    }

                }

                return res.status(200).json({
                    status: `success`,
                    msg: 'You dont have acces to this resource',
                });

                break;
            case 'starships':

                heroInfo.starships.forEach((el: string) => {
                    const heroFilmsID = el.split('/');
                    id.push(parseInt(heroFilmsID[heroFilmsID.length - 2]));
                });

                for (let i = 0; i < id.length; i++) {
                    const el = id[i];
                    if (el === idReq.starships) {

                        await fetch(`https://swapi.dev/api/starships/${idReq.starships}/`)
                            .then(res => res.json())
                            .then(data => {
                                count.push(data.name);
                                return data.name
                            })
                            .catch(err => console.error(err));

                        return res.status(200).json({
                            status: `success`,
                            starships: count,
                        });
                    }

                }

                return res.status(200).json({
                    status: `success`,
                    msg: 'You dont have acces to this resource',
                });
                break;
            case 'vehicles':
                heroInfo.vehicles.forEach((el: string) => {
                    const heroFilmsID = el.split('/');
                    id.push(parseInt(heroFilmsID[heroFilmsID.length - 2]));
                });

                for (let i = 0; i < id.length; i++) {
                    const el = id[i];
                    if (el === idReq.vehicles) {

                        await fetch(`https://swapi.dev/api/vehicles/${idReq.vehicles}/`)
                            .then(res => res.json())
                            .then(data => {
                                count.push(data.name);
                                return data.name
                            })
                            .catch(err => console.error(err));

                        return res.status(200).json({
                            status: `success`,
                            vehicles: count,
                        });
                    }

                }

                return res.status(200).json({
                    status: `success`,
                    msg: 'You dont have acces to this resource',
                });
                break;
            case 'species':
                heroInfo.species.forEach((el: string) => {
                    const heroFilmsID = el.split('/');
                    id.push(parseInt(heroFilmsID[heroFilmsID.length - 2]));
                });

                for (let i = 0; i < id.length; i++) {
                    const el = id[i];
                    if (el === idReq.species) {

                        await fetch(`https://swapi.dev/api/species/${idReq.species}/`)
                            .then(res => res.json())
                            .then(data => {
                                count.push(data.name);
                                return data.name
                            })
                            .catch(err => console.error(err));

                        return res.status(200).json({
                            status: `success`,
                            species: count,
                        });
                    }

                }

                return res.status(200).json({
                    status: `success`,
                    msg: 'You dont have acces to this resource',
                });
                break;
            case 'planets':
                const planetData = await fetch(`https://swapi.dev/api/planets/${idReq.planets}/`)
                    .then(res => res.json())
                    .then(data => data)
                    .catch(err => console.error(err));

                for (let i = 0; i < planetData.residents.length; i++) {
                    const el = planetData.residents[i];
                    if (el === heroInfo.url) {
                        return res.status(200).json({
                            status: `success`,
                            planets: planetData.name,
                        });
                    }
                }

                return res.status(200).json({
                    status: `success`,
                    msg: 'You dont have acces to this resource',
                });

                break;
            default:
                break;
        }




    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: `failure`,
            msg: "somthing goes wrong with specificID"
        });
    }

}

export default specificID;