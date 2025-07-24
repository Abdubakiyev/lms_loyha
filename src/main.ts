import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useStaticAssets(join(__dirname, '..','src', 'uploads'), {
    prefix: '/uploads/',
  });

  app.useStaticAssets(join(__dirname, '..','src', 'public'), {
    prefix: '/public/',
  });

  const config = new DocumentBuilder()
    .setTitle('LMS API')
    .setDescription('Learning Management System APIs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document, {
    customCss: `
      body {
        background-image: url('/public/Uchiha-Madara-Infinite-Tsukuyomi-thumb.png');
        background-size: cover;
        background-repeat: no-repeat;
        background-attachment: fixed;
      }
    `,
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
