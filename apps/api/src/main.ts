import { VersioningType } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  })
);
app.useGlobalFilters(new HttpExceptionFilter());
app.setGlobalPrefix("api");

app.enableVersioning({
  type: VersioningType.URI,
  defaultVersion: "1",
});
const swaggerConfig = new DocumentBuilder()
  .setTitle("AI SDR SaaS API")
  .setDescription("REST API for the AI SDR SaaS platform")
  .setVersion("1.0")
  .build();

const swaggerDocument = SwaggerModule.createDocument(
  app,
  swaggerConfig
);

SwaggerModule.setup(
  "api/docs",
  app,
  swaggerDocument
);
  const configService = app.get(ConfigService);
  const port = configService.get<number>("PORT", 3001);

  await app.listen(port);

  console.log(`🚀 API running at http://localhost:${port}`);
}

bootstrap();
