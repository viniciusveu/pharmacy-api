/* istanbul ignore file */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, Logger } from '@nestjs/common';

const startSwagger = (app: INestApplication): void => {  
  const config = new DocumentBuilder()
    .setTitle('Pharmacy API')
    .setDescription('The Pharmacy API can be used to manage medicines in a pharmacy (stock, groups, etc).')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build(); 
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  startSwagger(app); 

  const PORT = process.env.PORT;
  await app.listen(PORT, () => {
    Logger.log(`Running on port ${PORT} 🚀`);
  });
} 
bootstrap(); 
