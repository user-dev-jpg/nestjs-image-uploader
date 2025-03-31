import { Module } from '@nestjs/common';
import { FileUploadController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [FileUploadController],
  providers: [AppService],
})
export class AppModule { }
