const BaseModel = require("./baseModel");
const { DataTypes } = require("sequelize");

class Stock extends BaseModel {
    static init(sequelize) {
        return super.init(
            {
                company_name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                ticker: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                current_price: {
                    type: DataTypes.FLOAT,
                    allowNull: true,
                },
                change: {
                    type: DataTypes.FLOAT,
                    allowNull: true,
                },
                percent_change: {
                    type: DataTypes.FLOAT,
                    allowNull: true,
                },
                high_price_of_day: {
                    type: DataTypes.FLOAT,
                    allowNull: true,
                },
                low_price_of_day: {
                    type: DataTypes.FLOAT,
                    allowNull: true,
                },
                open_price_of_day: {
                    type: DataTypes.FLOAT,
                    allowNull: true,
                },
                previous_close: {
                    type: DataTypes.FLOAT,
                    allowNull: true,
                },
            },
            { sequelize, modelName: "stock" }
        )
    }

    static associate(models) {
        this.hasMany(models.Transaction, { foreignKey: "stock_id", as: "transactions" });
        this.belongsToMany(models.Watchlist, { through: "stock_watchlist", as: "watchlists", foreignKey: "stock_id" });
    }
};

module.exports = Stock