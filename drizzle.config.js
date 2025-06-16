/** @type {import("drizzle-kit").config}*/

export default{
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
        url: 'postgresql://neondb_owner:npg_x6UE7QXrLeNw@ep-wispy-frog-a8u7rs17-pooler.eastus2.azure.neon.tech/ai-interview-mocker?sslmode=require',
    }
}