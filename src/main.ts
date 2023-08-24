import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";
import helmet from "helmet";

import { AppModule } from "./app.module";
import { AppGuard } from "./app.guard";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);

  app.enableCors({ origin: "*" });
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalGuards(new AppGuard());
  
  const PORT = config.get("PORT") || 8000;
  await app.listen(PORT);
}
bootstrap();
