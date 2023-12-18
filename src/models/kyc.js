export default (sequelize, DataTypes) => {
  const Kyc = sequelize.define(
    "kyc",

    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      firstname: {
        type: DataTypes.STRING,
      },
      middlename: {
        type: DataTypes.STRING,
      },
      lastname: {
        type: DataTypes.STRING,
      },
      dob: {
        type: DataTypes.DATEONLY,
      },
      bvn: {
        type: DataTypes.INTEGER,
      },
      country: {
        type: DataTypes.STRING,
      },
      state: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      postal_code: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
      document_type_id: {
        type: DataTypes.INTEGER,
      },
      document_number: {
        type: DataTypes.STRING,
      },
      business_name: {
        type: DataTypes.STRING,
      },
      registration_number: {
        type: DataTypes.STRING,
      },
      tin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
  Kyc.associate = (models) => {
    Kyc.belongsTo(models.user, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
    });
  };

  return Kyc;
};
