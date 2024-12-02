import { RequestMethod, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformResponseInterceptor } from './common/interceptors/transform-response.interceptor';
import config from './config';

console.log(config, 'config');
const PORT = config.PORT || 8000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.enableVersioning({
    type: VersioningType.URI
  });
  app.setGlobalPrefix('api', {
    exclude: [
      { path: '', method: RequestMethod.GET },
      { path: 'api-docs', method: RequestMethod.GET },
      { path: 'api-docs/bundled.yaml', method: RequestMethod.GET }
    ]
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  );
  app.useGlobalInterceptors(new TransformResponseInterceptor(app.get(Reflector)));

  await app.listen(PORT);
}
bootstrap();
