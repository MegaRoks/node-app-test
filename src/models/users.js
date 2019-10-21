module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define(
        'Users',
        {
            user_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            first_name: {
                allowNull: {
                    args: false,
                    msg: 'Please enter your first name',
                },
                type: DataTypes.STRING,
            },
            last_name: {
                allowNull: {
                    args: false,
                    msg: 'Please enter your last name',
                },
                type: DataTypes.STRING,
            },
            user_email: {
                allowNull: {
                    args: false,
                    msg: 'Please enter your email',
                },
                type: DataTypes.STRING,
            },
            user_password: {
                allowNull: {
                    args: false,
                    msg: 'Please enter your password',
                },
                type: DataTypes.STRING,
            },
        },
        {},
    );

    Users.associate = models => {
        Users.hasMany(models.Files, {
            foreignKey: 'user_id',
        });
    };

    return Users;
};
