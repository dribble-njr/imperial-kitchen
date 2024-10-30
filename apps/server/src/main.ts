import { NestFactory } from '@nestjs/core';
import { RequestMethod, VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import config from './config';

const PORT = config.PORT || 8000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI
  });
  app.setGlobalPrefix('api', {
    exclude: [
      { path: '', method: RequestMethod.GET },
      { path: 'api-docs', method: RequestMethod.GET },
      { path: 'api-docs/openapi.yaml', method: RequestMethod.GET }
    ]
  });
  await app.listen(PORT);
}
bootstrap();
