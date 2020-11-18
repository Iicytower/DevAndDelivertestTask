export type UserReq = {
    userID?: string,
    email?: string,
    password?: string,
    characterSW?: number,
    salt?: string,
};

export type specificID = {
    resource: string,
    films?: number,
    starships?: number,
    vehicles?: number,
    species?: number,
    planets?: number,
}