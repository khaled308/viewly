import { defineConfig } from "drizzle-kit";
import { DATABASE_URL } from "./config/constants.js";

export default defineConfig({
  dialect: "postgresql",
  schema: "./schemas",
  dbCredentials: {
    url: DATABASE_URL,
  },
});
