// models/WasteCollection.js
module.exports = (sequelize, DataTypes) => {
    const WasteCollection = sequelize.define('WasteCollection', {
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        time: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'scheduled',  // Could be 'scheduled', 'completed', 'cancelled'
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        // Add other fields as necessary
    });

    WasteCollection.associate = function(models) {
        WasteCollection.belongsTo(models.User, { foreignKey: 'userId' });
    };

    return WasteCollection;
};
