
import sequelizeConnection from '../config/dbConnection';
import { DataTypes } from 'sequelize';


const Image = sequelizeConnection.define('image', {
    title: {
        type: DataTypes.STRING,
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'images'
});

export { Image };
