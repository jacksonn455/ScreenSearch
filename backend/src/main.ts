import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { config } from 'dotenv';
import { resolve } from 'path';
config({ path: resolve(process.cwd(), '.env') });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('screen-search')
    .setDescription('A REST API for searching movies and managing favorites')
    .setVersion('1.0')
    .addTag('Movies', 'Endpoints for searching movies')
    .addTag('Favorites', 'Endpoints for managing favorite movies')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'screen-search API Documentation',
  });
  
  await app.listen(3000);
}

bootstrap();