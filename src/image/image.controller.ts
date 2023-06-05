import {
  Controller,
  Get,
  Param,
  Post,
  Request,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import { diskStorage } from 'multer';
import { AuthGuard } from '../auth/auth.guard';
import { Public } from '../auth/constants';

@ApiBearerAuth()
@Controller('image')
export class ImageController {
  constructor(private imageService: ImageService) {}

  @UseGuards(AuthGuard)
  @Post('/upload/avatar')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './files',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${file.originalname}`);
        },
      }),
    }),
  )
  uploadAvatar(@UploadedFile() file, @Request() req) {
    this.imageService.uploadAvatar(file.filename, req.user.username);
  }

  @UseGuards(AuthGuard)
  @Post('/upload/card')
  @UseInterceptors(
    FileInterceptor('card', {
      storage: diskStorage({
        destination: './files',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${file.originalname}`);
        },
      }),
    }),
  )
  uploadCard(@UploadedFile() file, @Request() req) {
    this.imageService.uploadCard(file.filename, req.user.username);
  }

  @UseGuards(AuthGuard)
  @Post('/upload/profile')
  @UseInterceptors(
    FileInterceptor('profile', {
      storage: diskStorage({
        destination: './files',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${file.originalname}`);
        },
      }),
    }),
  )
  uploadProfile(@UploadedFile() file, @Request() req) {
    this.imageService.uploadProfile(file.filename, req.user.username);
  }

  @Public()
  @Get('avatars/:fileId')
  async serveAvatar(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'files' });
  }
}
