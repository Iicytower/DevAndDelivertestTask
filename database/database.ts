import { Sequelize } from "sequelize";
import UserModel from "./models/user";

const DATABASE_NAME = (!!process.env.DATABASE_NAME) ? String(process.env.DATABASE_NAME) : 'db';
const DATABASE_USERNAME = (!!process.env.DATABASE_USERNAME) ? String(process.env.DATABASE_USERNAME) : 'root';
const DATABASE_PASSWORD = (!!process.env.DATABASE_PASSWORD) ? String(process.env.DATABASE_PASSWORD) : 'root';
const DATABASE_HOST = (!!process.env.DATABASE_HOST) ? String(process.env.DATABASE_HOST) : 'database';

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

const { models } = connection;

UserModel(connection)

const initDbConnection = async () => {
    try {
        await connection.sync({ alter: true });
        console.log("The database connection has been successfully established!");
        console.log("----------------------");
    } catch (error) {
        console.error({
            error,
            message: "There was a problem connecting to the database!",
        });
        throw error;
    }
};
initDbConnection();
export default { models, initDbConnection };