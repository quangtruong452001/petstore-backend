import {
  Controller,
  UseGuards,
} from '@nestjs/common/decorators';
import { JwtGuard } from '../auth/guard';
import { OrderService } from '../order/order.service';
import { Get } from '@nestjs/common';

@UseGuards(JwtGuard)
@Controller('admin')
export class AdminController {
  constructor(private orderService: OrderService) {}

  @Get('dashboard')
  async dashboard() {
    const totalOrder = await this.orderService.count({});
    const totalPendingOrder = await this.orderService.count(
      { status: 'pending' },
    );
    const totalSoldProduct = await this.orderService.count({
      status: 'done',
    });
    const totalSale = await this.orderService.totalSale();
    const orders = await this.orderService.getLatestOrder(
      {},
      5,
    );
    return {
      totalOrder,
      totalPendingOrder,
      totalSoldProduct,
      totalSale,
      orders,
    };
  }
}
