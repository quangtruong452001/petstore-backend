import {
  ConfigModule,
  ConfigService,
} from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';
import { CategoryModule } from './category/category.module';
import { HomepageModule } from './homepage/homepage.module';
import { BlogModule } from './blog/blog.module';
import { ImageModule } from './image/image.module';
import { AdminModule } from './admin/admin.module';
import { TestModule } from './test/test.module';

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
    OrderModule,
    PaymentModule,
    CategoryModule,
    HomepageModule,
    BlogModule,
    ImageModule,
    AdminModule,
    TestModule,
  ],
})
export class AppModule {}
