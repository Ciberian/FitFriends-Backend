import * as mime from 'mime-types';
import { join } from 'path';
import { makeId } from '@fit-friends/core'
import { diskStorage } from 'multer';
import { ConfigService } from '@nestjs/config';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

const DEFAULT_ID_LENGTH = 32;

export function getMulterConfig(configService: ConfigService): MulterOptions {
  const uploadFolder = configService.get<string>('static.upload');

  return {
    storage: diskStorage({
      destination: join(__dirname, uploadFolder),
      filename: (_req, file, callback) => {
        const filename = makeId(DEFAULT_ID_LENGTH);
        let extension = mime.extension(file.mimetype);

        if (!extension) {
          extension = file.mimetype.split('/')[1]
        }

        callback(null, `${filename}.${extension}`);
      },
    }),
  };
}
