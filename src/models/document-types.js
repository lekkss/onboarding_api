export default (sequelize, DataTypes) => {
  const DocumentTypes = sequelize.define(
    "document_types",

    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
      },
      slug: {
        type: DataTypes.STRING,
      },
      level: {
        type: DataTypes.INTEGER,
      },
      created_at: {
        type: DataTypes.DATE,
        default: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      defaultScope: {
        // exclude password by default
        attributes: { exclude: ["password"] },
      },
      scopes: {
        // include password with this scope
        withPassword: { attributes: {} },
      },
    }
  );

  return DocumentTypes;
};
