import { DataSource, DataSourceOptions } from "typeorm";
import config from "@/config";

import { Session, User } from "@/modals";

const dsConfig : DataSourceOptions = {
    type: "postgres",
    url: config.DATABASE_URL,
    synchronize: true,
    logging: false,
    ssl: config.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
    entities: [User, Session]
}

const db = new DataSource(dsConfig);

export default db;