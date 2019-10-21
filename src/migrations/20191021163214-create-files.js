module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Files', {
            file_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            file_name: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            file_path: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            user_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            url_code: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            count_downloads: {
                allowNull: false,
                defaultValue: 0,
                type: Sequelize.INTEGER,
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
        return queryInterface.dropTable('Files');
    },
};
