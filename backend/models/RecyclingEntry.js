// models/RecyclingEntry.js
module.exports = (sequelize, DataTypes) => {
    const RecyclingEntry = sequelize.define('RecyclingEntry', {
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        material: {
            type: DataTypes.STRING,
            allowNull: false
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false  // Assume amount is in kilograms for simplicity
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    RecyclingEntry.associate = function(models) {
        RecyclingEntry.belongsTo(models.User, { foreignKey: 'userId' });
    };

    return RecyclingEntry;
};
