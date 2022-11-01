import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Payment,
  PaymentDocument,
} from 'src/schemas/payment.schema';
import { PaymentDto, PaymentUpdateDto } from './dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name)
    private paymentModel: Model<PaymentDocument>,
  ) {}

  async getPayments(limit?: string, skip?: string) {
    try {
      // Determine filters in find()
      const filters: any = {};

      // Determine options in find()
      const options: any = {};
      if (limit) options.limit = parseInt(limit);
      if (skip) options.skip = parseInt(skip);

      // Find payments
      const payments = await this.paymentModel.find(
        filters,
        null,
        options,
      );
      return { payments, statusCode: 200 };
    } catch (err) {
      throw err;
    }
  }

  async getTotalPayments() {
    try {
      // Determine filters in find()
      const filters: any = {};

      // Find total number of payments
      const totalPayments =
        await this.paymentModel.countDocuments(filters);

      return {
        totalPayments,
        statusCode: 200,
      };
    } catch (err) {
      throw err;
    }
  }

  async getPaymentById(paymentId: string) {
    try {
      // Determine filters in find()
      const filters: any = {
        _id: paymentId,
      };

      // Find payment detail
      const payment = await this.paymentModel.findOne(
        filters,
      );
      return { payment, statusCode: 200 };
    } catch (err) {
      throw err;
    }
  }

  async createPayment(paymentDto: PaymentDto) {
    try {
      // Create payment in the database:
      const createdPayment = await this.paymentModel.create(
        { ...paymentDto },
      );
      return {
        paymentId: createdPayment._id,
        statusCode: 201,
      };
    } catch (err) {
      throw err;
    }
  }

  async updatePaymentById(
    paymentId: string,
    paymentDto: PaymentUpdateDto,
  ) {
    try {
      const updatedPayment =
        await this.paymentModel.updateOne(
          {
            _id: paymentId,
          },
          {
            ...paymentDto,
          },
        );
      return {
        updatedCount: updatedPayment.modifiedCount,
        statusCode: 200,
      };
    } catch (err) {
      throw err;
    }
  }

  async deletePaymentById(paymentId: string) {
    try {
      const deletedPayment =
        await this.paymentModel.deleteOne({
          _id: paymentId,
        });
      return {
        deletedCount: deletedPayment.deletedCount,
        statusCode: 200,
      };
    } catch (err) {
      throw err;
    }
  }
}
