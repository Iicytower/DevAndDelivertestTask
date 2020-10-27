import sequelize from 'sequelize';

const { STRING, UUID, UUIDV4, INTEGER, } = sequelize.DataTypes;

export default function (sequelize: any) {
    sequelize.define('User', {
        userID: {
            type: UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
            allownull: false,
        },
        email: {
            type: STRING,
            allownull: false,
        },
        password: {
            type: STRING,
            allownull: false,
        },
        salt: {
            type: STRING,
            allownull: false,
        },
        characterSW: {
            type: INTEGER,
            allownull: false,
        }
    }
    )
};

