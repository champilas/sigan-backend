import { QueryInterface } from "sequelize";
import { USERS_TABLE, UserSchema } from "../models/user.model";
import { FARMS_TABLE, FarmSchema } from "../models/farm.model";
import { HERDS_TABLE, HerdSchema } from "../models/herd.model";
import { COWS_TABLE, CowSchema } from "../models/cow.model";
import { SERVICES_TABLE, ServiceSchema } from "../models/service.model";
import { BIRTHS_TABLE, BirthSchema } from "../models/birth.model";
import { HEATS_TABLE, HeatSchema } from "../models/heat.model";
import { ADMINS_TABLE, AdminSchema } from "../models/admin.model";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable(ADMINS_TABLE, AdminSchema);
    await queryInterface.createTable(USERS_TABLE, UserSchema);
    await queryInterface.createTable(FARMS_TABLE, FarmSchema);
    await queryInterface.createTable(HERDS_TABLE, HerdSchema);
    await queryInterface.createTable(COWS_TABLE, CowSchema);
    await queryInterface.createTable(SERVICES_TABLE, ServiceSchema);
    await queryInterface.createTable(BIRTHS_TABLE, BirthSchema);
    await queryInterface.createTable(HEATS_TABLE, HeatSchema);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable(HEATS_TABLE);
    await queryInterface.dropTable(BIRTHS_TABLE);
    await queryInterface.dropTable(SERVICES_TABLE);
    await queryInterface.dropTable(COWS_TABLE);
    await queryInterface.dropTable(HERDS_TABLE);
    await queryInterface.dropTable(FARMS_TABLE);
    await queryInterface.dropTable(USERS_TABLE);
    await queryInterface.dropTable(ADMINS_TABLE);
  },
};
