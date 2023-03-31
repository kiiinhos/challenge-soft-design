import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export function setupSwagger(app: INestApplication) {
  const authOptions: SecuritySchemeObject = {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
  };
  const options = new DocumentBuilder()
    .setTitle('SoftDesign Challenge API')
    .setDescription('API para gerenciar livros')
    .setVersion('1.0')
    .addTag('books')
    .addBearerAuth(authOptions, 'JWT')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}
