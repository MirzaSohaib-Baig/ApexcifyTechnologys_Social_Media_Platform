const { DataTypes } = require("sequelize");
const BaseModel = require("./baseModel");

class User extends BaseModel {
  static init(sequelize) {
    return super.init(
      {
        first_name: {
          type: DataTypes.STRING,
          allowNull: false,
            required: true,
        },
        last_name: {
          type: DataTypes.STRING,
          allowNull: false,
            required: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          required: true,
          unique: true,
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          required: true,
        },
        bio: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        image: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        facebook_id: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        x_id: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        linkedin_id: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        instagram_id: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        country: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        city_state: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        postal_code: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        tax_id: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      { sequelize, modelName: "user" }
    );
  }

  static associate(models) {
    // Define associations here if needed
    this.hasMany(models.Transaction, { foreignKey: "user_id", as: "transactions" });
    this.hasOne(models.Portfolio, { foreignKey: "user_id", as: "portfolios" });
    this.hasMany(models.Holding, { foreignKey: "user_id", as: "holdings" });
    this.hasMany(models.Watchlist, { foreignKey: "user_id", as: "watchlists" });
    this.hasMany(models.Alert, { foreignKey: "user_id", as: "alerts" });
  }
}

module.exports = User;
