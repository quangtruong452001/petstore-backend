import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { PaymentDto, PaymentUpdateDto } from './dto';
import { PaymentService } from './payment.service';

@UseGuards(JwtGuard)
@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Get()
  getPayments(
    @GetUser('id') userId: string,
    @Query('limit') limit?: string,
    @Query('page') page?: string,
  ) {
    return this.paymentService.getPayments(
      userId,
      limit,
      page,
    );
  }

  @Get('total')
  getTotalPayments(@GetUser('id') userId: string) {
    return this.paymentService.getTotalPayments(userId);
  }

  @Get(':id')
  getPaymentById(
    @Param('id') paymentId: string,
    @GetUser('id') userId: string,
  ) {
    return this.paymentService.getPaymentById(
      paymentId,
      userId,
    );
  }

  @Post()
  createPayment(
    @Body() paymentDto: PaymentDto,
    @GetUser('id') userId: string,
  ) {
    return this.paymentService.createPayment(
      paymentDto,
      userId,
    );
  }

  @Patch(':id')
  updatePaymentById(
    @Param('id') paymentId: string,
    @Body() paymentDto: PaymentUpdateDto,
    @GetUser('id') userId: string,
  ) {
    return this.paymentService.updatePaymentById(
      paymentId,
      paymentDto,
      userId,
    );
  }

  @Delete(':id')
  deletePaymentById(
    @Param('id') paymentId: string,
    @GetUser('id') userId: string,
  ) {
    return this.paymentService.deletePaymentById(
      paymentId,
      userId,
    );
  }
}
