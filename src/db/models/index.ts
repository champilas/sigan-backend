import { Sequelize } from "sequelize";
import { User, UserSchema } from "./user.model";
import { Farm, FarmSchema } from "./farm.model";
import { Herd, HerdSchema } from "./herd.model";
import { Cow, CowSchema } from "./cow.model";
import { Service, ServiceSchema } from "./service.model";
import { Birth, BirthSchema } from "./birth.model";
import { Heat, HeatSchema } from "./heat.model";

export function setupModels(sequelize: Sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Farm.init(FarmSchema, Farm.config(sequelize));
  Herd.init(HerdSchema, Herd.config(sequelize));
  Cow.init(CowSchema, Cow.config(sequelize));
  Service.init(ServiceSchema, Service.config(sequelize));
  Birth.init(BirthSchema, Birth.config(sequelize));
  Heat.init(HeatSchema, Heat.config(sequelize));

  User.associate(sequelize.models);
  Farm.associate(sequelize.models);
  Herd.associate(sequelize.models);
  Cow.associate(sequelize.models);
  Service.associate(sequelize.models);
  Birth.associate(sequelize.models);
  Heat.associate(sequelize.models);
}