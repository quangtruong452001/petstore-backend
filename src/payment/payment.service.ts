import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Payment,
  PaymentDocument,
} from '../schemas/payment.schema';
import { PaymentDto, PaymentUpdateDto } from './dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name)
    private paymentModel: Model<PaymentDocument>,
  ) {}

  async getPayments(
    userId: string,
    limit?: string,
    page?: string,
  ) {
    try {
      // Determine filters in find()
      const filters = {
        user: userId,
      };

      // Determine options in find()
      const options: any = {};
      if (limit) options.limit = parseInt(limit);
      if (page) options.skip = parseInt(page) - 1;

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

  async getTotalPayments(userId: string) {
    try {
      // Determine filters in find()
      const filters = {
        user: userId,
      };

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

  async getPaymentById(paymentId: string, userId: string) {
    try {
      // Determine filters in find()
      const filters = {
        _id: paymentId,
        user: userId,
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

  async createPayment(
    paymentDto: PaymentDto,
    userId: string,
  ) {
    try {
      // Create payment in the database:
      const createdPayment = await this.paymentModel.create(
        { ...paymentDto, user: userId },
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
    userId: string,
  ) {
    try {
      const updatedPayment =
        await this.paymentModel.updateOne(
          {
            _id: paymentId,
            user: userId,
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

  async deletePaymentById(
    paymentId: string,
    userId: string,
  ) {
    try {
      const deletedPayment =
        await this.paymentModel.deleteOne({
          _id: paymentId,
          user: userId,
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
