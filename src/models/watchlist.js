const BaseModel = require("./baseModel");
const { DataTypes } = require("sequelize");

class Watchlist extends BaseModel {
    static init(sequelize) {
        return super.init(
            {
                user_id: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
            },
            { sequelize, modelName: "watchlist" }
        );
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: "user_id" });
        this.belongsToMany(models.Stock, { through: "stock_watchlist", as: "stocks", foreignKey: "watchlist_id" });
    }
}

module.exports = Watchlist;