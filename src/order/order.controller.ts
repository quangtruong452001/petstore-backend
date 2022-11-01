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
import { OrderDto, OrderUpdateDto } from './dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  getOrders(
    @Query('userId') userId?: string,
    @Query('limit') limit?: string,
    @Query('skip') skip?: string,
  ) {
    return this.orderService.getOrders(userId, limit, skip);
  }

  @Get('total')
  getTotalOrders(@Query('userId') userId?: string) {
    return this.orderService.getTotalOrders(userId);
  }

  @Get(':id')
  getOrderById(
    @Param('id') orderId: string,
    @Query('userId') userId?: string,
  ) {
    return this.orderService.getOrderById(orderId, userId);
  }

  @Post()
  createOrder(@Body() orderDto: OrderDto) {
    return this.orderService.createOrder(orderDto);
  }

  @Patch(':id')
  updateOrderById(
    @Param('id') orderId: string,
    @Body() orderDto: OrderUpdateDto,
  ) {
    return this.orderService.updateOrderById(
      orderId,
      orderDto,
    );
  }

  @Delete(':id')
  deleteOrderById(@Param('id') orderId: string) {
    return this.orderService.deleteOrderById(orderId);
  }
}
