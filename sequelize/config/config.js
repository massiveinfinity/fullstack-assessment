module.exports = {
  development: {
    dialect: 'sqlite',
    storage: './dist/grocerydb.sqlite',
    logging: false,
    operatorsAliases: false,
    define: {
      timestamps: true,
      freezeTableName: true,
    },
  },
  production: {},
};
