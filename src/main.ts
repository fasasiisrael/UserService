
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit'
import { Logger } from '@nestjs/common';
import * as Prometheus from 'prom-client';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.use(helmet());
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  }));

  const options = new DocumentBuilder()
    .setTitle('Ecommerce User Service')
    .setDescription('API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const collectDefaultMetrics = Prometheus.collectDefaultMetrics;
  collectDefaultMetrics();

  app.use('/metrics', (req: any, res: { set: (arg0: string, arg1: any) => void; end: (arg0: any) => void; }) => {
    res.set('Content-Type', Prometheus.register.contentType);
    res.end(Prometheus.register.metrics());
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`Server running on http://localhost:${port}`, 'Bootstrap');
}

bootstrap();
  