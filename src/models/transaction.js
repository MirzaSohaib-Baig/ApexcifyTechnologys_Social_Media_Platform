const BaseModel = require("./baseModel");
const { DataTypes } = require("sequelize");

class Transaction extends BaseModel {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        category: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        amount: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        price_at_transaction: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        side: {
          type: DataTypes.ENUM("Buy", "Sell"),
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM("Pending", "Completed", "Failed"),
          allowNull: false,
        },
        payment_type: {
          type: DataTypes.ENUM("credit", "debit"),
          allowNull: false,
        },
        user_id: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        stock_id: {
          type: DataTypes.UUID,
          allowNull: false,
        },
      },
      { sequelize, modelName: "transaction" }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
    this.belongsTo(models.Stock, { foreignKey: "stock_id", as: "stock" });
  }
}

module.exports = Transaction;
