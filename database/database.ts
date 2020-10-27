import { Sequelize } from "sequelize";
import UserModel from "./models/user";

const DATABASE_NAME = 'db';
const DATABASE_USERNAME = 'root';
const DATABASE_PASSWORD = 'root';
const DATABASE_HOST = 'database';

const connection = new Sequelize(
    DATABASE_NAME,
    DATABASE_USERNAME,
    DATABASE_PASSWORD,
    {
        host: DATABASE_HOST,
        dialect: 'mysql',
        logging: false,
    }
);

export const { models } = connection;

UserModel(connection)

//assosiations

export const initDbConnection = async () => {
    try {
        await connection.sync({ alter: true });
        console.log("The database connection has been successfully established!");
        console.log("----------------------");
    } catch (error) {
        console.log({
            error,
            message: "There was a problem connecting to the database!",
        });
        throw error;
    }
};
initDbConnection();
export default { models, initDbConnection };