import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "../../.env",

      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid("development", "test", "production")
          .default("development"),

        PORT: Joi.number().port().default(3001),

        DATABASE_URL: Joi.string().uri().required(),

        REDIS_URL: Joi.string().uri().required(),

        JWT_SECRET: Joi.string().min(16).required(),

        OPENAI_API_KEY: Joi.string().allow("").optional(),

        SMTP_HOST: Joi.string().required(),

        SMTP_PORT: Joi.number().port().required(),

        SMTP_USER: Joi.string().allow("").optional(),

        SMTP_PASSWORD: Joi.string().allow("").optional(),

        SMTP_FROM: Joi.string().email().required(),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
