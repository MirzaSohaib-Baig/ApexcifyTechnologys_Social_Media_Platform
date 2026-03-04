const BaseModel = require("./baseModel");
const { DataTypes } = require("sequelize");

class Portfolio extends BaseModel {
  static init(sequelize) {
    return super.init(
        {
        total_value: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        risk_score: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        user_id: {
          type: DataTypes.UUID,
          allowNull: false,
        },
      },
      { sequelize, modelName: "portfolio" }
    );
  }

    static associate(models) {
    // Define associations here if needed
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
  }
}

module.exports = Portfolio;