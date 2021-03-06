module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Users', {
            user_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            first_name: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            last_name: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            user_email: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            user_password: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Users');
    },
};
