import { DataSource, DataSourceOptions } from "typeorm";
import config from "@/config";

import { User, Book, Review, Order } from "@db/modals";

const dsConfig : DataSourceOptions = {
    type: "postgres",
    url: config.DATABASE_URL,
    synchronize: true,
    logging: false,
    ssl: config.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
    entities: [User, Book, Review, Order],
}

const db = new DataSource(dsConfig);

export default db;