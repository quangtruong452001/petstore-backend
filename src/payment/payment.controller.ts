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
import { PaymentDto, PaymentUpdateDto } from './dto';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Get()
  getPayments(
    @Query('limit') limit?: string,
    @Query('skip') skip?: string,
  ) {
    return this.paymentService.getPayments(limit, skip);
  }

  @Get('total')
  getTotalPayments() {
    return this.paymentService.getTotalPayments();
  }

  @Get(':id')
  getPaymentById(@Param('id') paymentId: string) {
    return this.paymentService.getPaymentById(paymentId);
  }

  @Post()
  createPayment(@Body() paymentDto: PaymentDto) {
    return this.paymentService.createPayment(paymentDto);
  }

  @Patch(':id')
  updatePaymentById(
    @Param('id') paymentId: string,
    @Body() paymentDto: PaymentUpdateDto,
  ) {
    return this.paymentService.updatePaymentById(
      paymentId,
      paymentDto,
    );
  }

  @Delete(':id')
  deletePaymentById(@Param('id') paymentId: string) {
    return this.paymentService.deletePaymentById(paymentId);
  }
}
