import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('api')

  app.enableCors({
    origin: true,
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
  })

  const uploadPath = join(__dirname, '..', 'uploads');
  if (!existsSync(uploadPath)) {
    mkdirSync(uploadPath, { recursive: true });
  }

  app.useStaticAssets(uploadPath, { prefix: '/uploads' });
  await app.listen(3000, () => {
    console.log('3000 started')    
  });

}
bootstrap();
