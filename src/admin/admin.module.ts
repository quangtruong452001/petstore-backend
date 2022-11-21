import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Order,
  OrderSchema,
} from '../schemas/order.schema';
import { OrderService } from '../order/order.service';
import { AdminController } from './admin.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
    ]),
    HttpModule,
  ],
  controllers: [AdminController],
  providers: [OrderService],
})
export class AdminModule {}
