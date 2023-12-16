export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",

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
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: {
            msg: "Must be a valid email address",
          },
        },
      },
      phone: {
        type: DataTypes.STRING,
      },
      country_code: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.ENUM("personal", "business"),
      },
      dob: {
        type: DataTypes.DATE,
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
      phone_verified_at: {
        type: DataTypes.DATE,
      },
      email_verified_at: {
        type: DataTypes.DATE,
      },
      two_factor_confirmed_at: {
        type: DataTypes.DATE,
      },
      current_team_id: {
        type: DataTypes.STRING,
      },
      profile_photo_path: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      phone_number: {
        type: DataTypes.STRING,
      },
      profile_photo_url: {
        type: DataTypes.STRING,
      },
      has_kyc: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
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

  return User;
};
