import { NestFactory } from '@nestjs/core';
import { ConsoleLogger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './all-exceptions.filter';
import morgan from 'morgan';

async function bootstrap() {
  const isDev = process.env.NODE_ENV === 'development';
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      json: !isDev,
    }),
  });

  app.useGlobalFilters(new AllExceptionsFilter());

  if (isDev) {
    app.use(morgan('dev'));
  }
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Full Stack API')
    .setDescription('Automated API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableCors({
    origin: '*',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
