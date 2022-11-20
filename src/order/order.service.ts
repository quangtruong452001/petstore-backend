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
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<OrderDocument>,
    private readonly httpService: HttpService,
  ) {}

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
        user: userId,
      };

      // Find order detail
      const order = await this.orderModel.findOne(filters);
      let orderDetail = await order.populate('payment');

      // ** Get shipping detail:
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Token: '5afa38c1-5c4b-11ed-b8cc-a20ef301dcd7',
        },
      };
      const data_raw = {
        order_code: orderDetail.shipping,
      };
      const { data } = await firstValueFrom(
        this.httpService.post(
          'https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/detail',
          data_raw,
          config,
        ),
      );

      return {
        order: orderDetail,
        shipping: data.data,
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
        confirmStatus: ORDER_STATUS.PENDING,
      };
      if (orderDto.payment)
        otherInfos.payment = orderDto.payment;
      if (orderDto.shipping)
        otherInfos.shipping = orderDto.shipping;

      // Create order in the database:
      const createdOrder = await this.orderModel.create({
        ...orderDto,
        ...otherInfos,
      });

      return {
        paymentId: orderDto.payment ? orderDto.payment : '',
        shippingId: orderDto.shipping
          ? orderDto.shipping
          : '',
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
          user: userId,
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
}
