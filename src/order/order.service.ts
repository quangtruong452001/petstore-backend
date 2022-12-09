import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ORDER_STATUS } from '../../constants';
import { Model } from 'mongoose';
import {
  Order,
  OrderDocument,
} from '../schemas/order.schema';
import { OrderDto, OrderUpdateDto } from './dto';
import { HttpService } from '@nestjs/axios';
// import { firstValueFrom } from 'rxjs';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<OrderDocument>,
    private readonly httpService: HttpService,
  ) {}

  async getLatestOrder(option: any, limit?: any) {
    try {
      option ? option : {};
      limit = parseInt(limit);
      if (limit < 0) {
        limit = 5;
      }
      const orders = await this.orderModel
        .find(option)
        .limit(limit)
        .sort({ createdAt: -1 });
      return orders;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getOrders(
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

      // Find orders
      const orders = await this.orderModel.find(
        filters,
        null,
        options,
      );
      return { orders, statusCode: 200 };
    } catch (err) {
      throw err;
    }
  }

  async getAdminOrders(
    userId: string,
    limit?: string,
    page?: string,
  ) {
    try {
      // Determine filters in find()
      const filters = {};

      // Determine options in find()
      const options: any = {};
      if (limit) options.limit = parseInt(limit);
      if (page) options.skip = parseInt(page) - 1;

      // Find orders
      const orders = await this.orderModel.find(
        filters,
        null,
        options,
      );
      return { orders, statusCode: 200 };
    } catch (err) {
      throw err;
    }
  }

  async getTotalOrders(userId: string) {
    try {
      // Determine filters in find()
      const filters = {
        user: userId,
      };

      // Find orders
      const totalOrders =
        await this.orderModel.countDocuments(filters);

      return {
        totalOrders,
        statusCode: 200,
      };
    } catch (err) {
      throw err;
    }
  }

  async getOrderById(orderId: string, userId: string) {
    try {
      // Determine filters in find()
      const filters = {
        _id: orderId,
        // user: userId,
      };

      // Find order detail
      const order = await this.orderModel.findOne(filters);
      let orderDetail = order;
      if (order.payment)
        orderDetail = await order.populate('payment');

      return {
        order: orderDetail,
        statusCode: 200,
      };
    } catch (err) {
      throw err;
    }
  }

  async createOrder(orderDto: OrderDto, userId: string) {
    try {
      // Other information added to order:
      const otherInfos: any = {
        user: userId,
        status: ORDER_STATUS.PENDING,
      };
      if (orderDto.payment)
        otherInfos.payment = orderDto.payment;

      // Create order in the database:
      const createdOrder = await this.orderModel.create({
        ...orderDto,
        ...otherInfos,
      });

      return {
        paymentId: orderDto.payment ? orderDto.payment : '',
        orderId: createdOrder._id,
        statusCode: 201,
      };
    } catch (err) {
      throw err;
    }
  }

  async updateOrderById(
    orderId: string,
    orderDto: OrderUpdateDto,
    userId: string,
  ) {
    try {
      const updatedOrder = await this.orderModel.updateOne(
        {
          _id: orderId,
          // user: userId,
        },
        {
          ...orderDto,
        },
      );
      return {
        updatedCount: updatedOrder.modifiedCount,
        statusCode: 200,
      };
    } catch (err) {
      throw err;
    }
  }

  async deleteOrderById(orderId: string, userId: string) {
    try {
      const deletedOrder = await this.orderModel.deleteOne({
        _id: orderId,
        user: userId,
      });
      return {
        deletedCount: deletedOrder.deletedCount,
        statusCode: 200,
      };
    } catch (err) {
      throw err;
    }
  }

  async count(options: any) {
    try {
      options ? options : {};
      return this.orderModel.count(options);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async totalSale() {
    try {
      let totalSale = 0;
      const orderList = await this.orderModel.find({});
      for (let i = 0; i < orderList.length; i++) {
        totalSale = orderList[i].totalPrice;
      }
      return totalSale;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
