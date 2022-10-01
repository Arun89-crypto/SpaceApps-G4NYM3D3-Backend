import * as dotenv from 'dotenv';
dotenv.config();

export default {
    host : process.env.HOST ?? '',
    environment : process.env.NODE_ENV ?? '',
    port : process.env.PORT ?? '',
    dbURI : process.env.DB_URI ?? '',
    dbName : process.env.DB_NAME ?? '',
    corsUrl : process.env.CORS_URL ?? '',
    accessPrivateKey : process.env.ACCESS_TOKEN_PRIVATE_KEY ?? '',
    accessPublicKey : process.env.ACCESS_TOKEN_PUBLIC_KEY ?? '',
    refreshPrivateKey : process.env.REFRESH_TOKEN_PRIVATE_KEY ?? '',
    refreshPublicKey : process.env.REFRESH_TOKEN_PUBLIC_KEY ?? '',
    accessTokenTtl : '60m',
    refreshTokenTtl : '1y',
    saltworkfactor : process.env.SALT_WRK_FACTR ?? 6
}