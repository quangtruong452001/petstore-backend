import {
  ConfigModule,
  ConfigService,
} from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';

const config: ConfigService = new ConfigService();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(config.get('DATABASE_URL')),
    AuthModule,
    UserModule,
    ProductModule,
  ],
})
export class AppModule {}
