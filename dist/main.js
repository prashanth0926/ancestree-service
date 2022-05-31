"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("config");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        cors: {
            origin: ((config === null || config === void 0 ? void 0 : config.cors) || []).split(','),
        },
    });
    app.setGlobalPrefix('api');
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('Ancestree Server')
        .setDescription('Ancestree Server')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('docs', app, document);
    await app.listen((config === null || config === void 0 ? void 0 : config.port) || 8080);
}
bootstrap();
//# sourceMappingURL=main.js.map