# nodemon

* ts-node/register  tsc 必须要加载的
* tsconfig-paths/register  alias 需要加在的



alias name

```json
{
    "name": "express-api-starter",
    "version": "1.2.0",
    "description": " A basic starter for an express.js API",
    "main": "index.js",
    "scripts": {
        "build": "rm -rf dist && tsc -p tsconfig.json",
        "start": "node dist/app.js",
        "dev": "nodemon --config nodemon.json src/app.ts",
        "debug": "nodemon --config nodemon.json --inspect-brk src/app.ts",
        "lint": "eslint --fix src",
        "test": "mocha --exit",
        "prettier": "prettier --config ./.prettierrc --write src/**/*.ts",
        "generate": "npx prisma generate",
        "migrate": "npx prisma migrate dev",
        "ui": "npx prisma studio",
        "pm2": "pm2 start dist/app.js"
    },
    "keywords": [],
    "author": "CJ R. <cj@null.computer> (https://w3cj.now.sh)",
    "repository": {
        "type": "git",
        "url": "https://github.com/w3cj/express-api-starter.git"
    },
    "license": "MIT",
    "dependencies": {
        "@prisma/client": "3.0.2",
        "bcrypt": "^5.0.1",
        "cors": "^2.8.5",
        "crypto": "^1.0.1",
        "dotenv": "^8.2.0",
        "express": "^4.17.1",
        "helmet": "^4.2.0",
        "http-errors": "^1.8.0",
        "joi": "^17.4.2",
        "jsonwebtoken": "^8.5.1",
        "lodash": "^4.17.21",
        "module-alias": "^2.2.2",
        "morgan": "^1.10.0",
        "mysql2": "^2.2.5",
        "passport": "^0.4.1",
        "passport-jwt": "^4.0.0",
        "passport-local": "^1.0.0",
        "pm2": "^5.1.1",
        "validator": "^13.6.0"
    },
    "devDependencies": {
        "eslint": "^7.14.0",
        "eslint-config-airbnb-base": "^14.2.1",
        "eslint-plugin-import": "^2.22.1",
        "mocha": "^8.2.1",
        "nodemon": "^2.0.6",
        "prettier": "^2.4.1",
        "prisma": "3.0.2",
        "supertest": "^6.0.1",
        "ts-node": "^10.2.1",
        "typescript": "^4.4.3",
        "husky": "^7.0.1",
        "lint-staged": "^11.1.2",
        "@types/express": "^4.17.13",
        "@types/node": "^16.4.2",
        "@types/http-errors": "1.8.1",
        "@types/validator": "^13.6.3",
        "@types/passport": "^1.0.0",
        "@types/passport-jwt": "^3.0.6",
        "@types/passport-local": "^1.0.34",
        "@types/bcrypt": "^5.0.0",
        "@types/cors": "^2.8.12",
        "@types/supertest": "^2.0.11",
        "@types/nodemon": "^1.19.1",
        "@types/dotenv": "^8.2.0",
        "@types/helmet": "^4.0.0",
        "@types/joi": "^17.2.3",
        "@types/jsonwebtoken": "^8.5.5",
        "@types/lodash": "^4.14.173",
        "@types/morgan": "^1.9.3"
    },
    "lint-staged": {
        "*.{js,ts}": "eslint --ext .js,.ts --fix --max-warnings 0 src/"
    },
    "_moduleAliases": {
        "@controllers": "dist/controllers",
        "@dao": "dist/dao",
        "@database": "dist/database",
        "@helpers": "dist/helpers",
        "@routes": "dist/routes",
        "@service": "dist/service",
        "@middleware": "dist/middleware"
    }
}
```