const BaseModel = require("./baseModel");
const { DataTypes } = require("sequelize");

class Holding extends BaseModel {
    static init(sequelize) {
        return super.init(
            {
                symbol: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                shares: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                user_id: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
            },
            { sequelize, modelName: "holdings" }
        );
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
    }
}

module.exports = Holding;