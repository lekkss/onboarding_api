export default (sequelize, DataTypes) => {
  const Bank = sequelize.define(
    "bank",
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      account_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      account_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      account_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bank_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      currency: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      terminal_id: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "active",
        allowNull: false,
      },
      balance: {
        type: DataTypes.DECIMAL(12, 2),
        defaultValue: 0,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        default: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
      },
      deleted_at: {
        type: DataTypes.DATE,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  Bank.associate = (models) => {
    Bank.belongsTo(models.user, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
    });
  };

  return Bank;
};
