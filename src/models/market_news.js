const BaseModel = require("./baseModel");
const { DataTypes } = require("sequelize");

class MarketNews extends BaseModel {
    static init(sequelize) {
        return super.init(
            {
                category: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                },
                datetime: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                headline: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                },
                news_id: {
                    type: DataTypes.BIGINT,
                    allowNull: false,
                },
                image : {
                    type: DataTypes.TEXT,
                    allowNull: false,
                },
                related: {
                    type: DataTypes.TEXT,
                    allowNull: true,
                },
                source: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                },
                summary: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                },
                url: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                },
            },
            { sequelize, modelName: "market_news" }
        );
    }
}

module.exports = MarketNews;