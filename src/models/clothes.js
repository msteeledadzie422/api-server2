'use strict';

module.exports = (sequelizeDatabase, DataTypes) => {
    return sequelizeDatabase.define('clothes', {
        item: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fabric: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        color: {
            type: DataTypes.String,
            allowNull: true,
        },
    });
};