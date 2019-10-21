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
                type: DataTypes.STRING,
                allowNull: {
                    args: false,
                    msg: 'Please enter your first name',
                },
            },
            last_name: {
                type: DataTypes.STRING,
                allowNull: {
                    args: false,
                    msg: 'Please enter your last name',
                },
            },
            user_email: {
                type: DataTypes.STRING,
                allowNull: {
                    args: false,
                    msg: 'Please enter your email',
                },
            },
            user_password: {
                type: DataTypes.STRING,
                allowNull: {
                    args: false,
                    msg: 'Please enter your password',
                },
                validate: {
                    isNotShort: value => {
                        if (value.length < 6) {
                            throw new Error('Password should be at least 8 characters');
                        }
                    },
                },
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
