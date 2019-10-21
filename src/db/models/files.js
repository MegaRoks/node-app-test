'use strict';
module.exports = (sequelize, DataTypes) => {
    const Files = sequelize.define(
        'Files',
        {
            file_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            file_name: {
                allowNull: {
                    args: false,
                    msg: 'Please enter your file name',
                },
                type: DataTypes.STRING,
            },
            file_path: {
                allowNull: {
                    args: false,
                    msg: 'Please enter your first path',
                },
                type: DataTypes.STRING,
            },
            user_id: {
                type: DataTypes.STRING,
                references: {
                    model: 'Users',
                    key: 'user_id',
                    as: 'user_id',
                },
            },
            url_code: {
                allowNull: {
                    args: false,
                    msg: 'Please enter your url code',
                },
                type: DataTypes.STRING,
            },
            count_downloads: {
                type: DataTypes.STRING,
                defaultValue: 0,
            },
        },
        {},
    );

    Files.associate = models => {
        Files.belongsTo(models.Users, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE',
        });
    };

    return Files;
};
