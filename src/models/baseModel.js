const { Model, DataTypes } = require("sequelize");

class BaseModel extends Model {
  static init(attributes, options = {}) {
    const baseAttributes = {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // or () => uuid.v4()
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
    };

    // merge base + custom attributes
    const mergedAttributes = { ...baseAttributes, ...attributes };

    // force timestamps
    const mergedOptions = { ...options, timestamps: true };

    return super.init(mergedAttributes, mergedOptions);
  }
}

module.exports = BaseModel;
