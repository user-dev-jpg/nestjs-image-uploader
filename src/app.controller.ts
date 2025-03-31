import { BadRequestException, Controller, HttpException, HttpStatus, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';


@Controller('files')
export class FileUploadController {

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
      },
    }),

    fileFilter: (req, file, cb) => {
      const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
      if (!allowedMimeTypes.includes(file.mimetype)) {
        return cb(new BadRequestException('Faqat JPG, PNG, JPG yoki WEBP formatlar qabul qilinadi!'), false);
      }
      cb(null, true);
    },
  }))

  async fileUpload(@UploadedFile() file: Express.Multer.File) {

    try {
      if (!file || !file.filename) {
        throw new BadRequestException('Fayl yuklanmadi yoki noto‘g‘ri formatda!');
      }

      // const url: string = this.configService.get<string>('API_URL_1');
      return {
        message: 'Fayl yuklandi',
        filePath: `https://houzing-image-upolader.up.railway.app/uploads/${file.filename}`,
      };
    } catch (error: any) {
      throw error instanceof HttpException
        ? error
        : new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }
}
