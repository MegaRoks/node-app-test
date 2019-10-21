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
                type: DataTypes.STRING,
                allowNull: {
                    args: false,
                    msg: 'Please enter your file name',
                },
            },
            file_path: {
                type: DataTypes.STRING,
                allowNull: {
                    args: false,
                    msg: 'Please enter your first path',
                },
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
                type: DataTypes.STRING,
                allowNull: {
                    args: false,
                    msg: 'Please enter your url code',
                },
            },
            count_downloads: {
                type: DataTypes.STRING,
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
