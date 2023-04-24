import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Femida')
    .setDescription('Femida API DOC')
    .setVersion('1.0')
    .addTag('femida')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({ origin: ['http://localhost:3000'], credentials: true });
  await app.listen(5000);
}
bootstrap();
