import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { OrderDto, OrderUpdateDto } from './dto';
import { OrderService } from './order.service';

@UseGuards(JwtGuard)
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  getOrders(
    @GetUser('id') userId: string,
    @Query('limit') limit?: string,
    @Query('page') page?: string,
  ) {
    return this.orderService.getOrders(userId, limit, page);
  }

  @Get('admin')
  getAdminOrders(
    @GetUser('id') userId: string,
    @Query('limit') limit?: string,
    @Query('page') page?: string,
  ) {
    return this.orderService.getAdminOrders(
      userId,
      limit,
      page,
    );
  }

  @Get('total')
  getTotalOrders(@GetUser('id') userId: string) {
    return this.orderService.getTotalOrders(userId);
  }

  @Get(':id')
  getOrderById(
    @Param('id') orderId: string,
    @GetUser('id') userId: string,
  ) {
    return this.orderService.getOrderById(orderId, userId);
  }

  @Post()
  createOrder(
    @Body() orderDto: OrderDto,
    @GetUser('id') userId: string,
  ) {
    return this.orderService.createOrder(orderDto, userId);
  }

  @Patch(':id')
  updateOrderById(
    @Param('id') orderId: string,
    @Body() orderDto: OrderUpdateDto,
    @GetUser('id') userId: string,
  ) {
    return this.orderService.updateOrderById(
      orderId,
      orderDto,
      userId,
    );
  }

  @Delete(':id')
  deleteOrderById(
    @Param('id') orderId: string,
    @GetUser('id') userId: string,
  ) {
    return this.orderService.deleteOrderById(
      orderId,
      userId,
    );
  }
}
