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
      { confirmStatus: 'pending' },
    );
    const totalSoldProduct = await this.orderService.count({
      confirmStatus: 'done',
    });
    const totalSale = await this.orderService.totalSale();
    return {
      totalOrder,
      totalPendingOrder,
      totalSoldProduct,
      totalSale,
    };
  }
}
