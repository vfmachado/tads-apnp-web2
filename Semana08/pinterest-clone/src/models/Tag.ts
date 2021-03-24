
import sequelizeConnection from '../config/dbConnection';
import { DataTypes } from 'sequelize';

const Tag = sequelizeConnection.define('tag', {
    description: {
        type: DataTypes.STRING,
        unique: true
    },
}, {
    tableName: 'tag'
});


export { Tag };
 