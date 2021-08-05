import { Inject, Injectable, CACHE_MANAGER, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Model } from 'mongoose';
import { Cache } from 'cache-manager';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePaymentDto } from './dtos/create-payment.dto';
import { MakePaymentDto } from './dtos/make-payment.dto';
import { UpdatePaymentDto } from './dtos/update-payment.dto';
import { Payment, PaymentDocument } from './schemas/payment-schema';
import { PayWithPaystackDto } from './dtos/pay-with-paystack.dto';

@Injectable()
export class PaymentsService {
  config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.PAYSTACK_API_TEST_SECRET_KEY}`,
    },
  };

  private readonly logger = new Logger(PaymentsService.name);
  constructor(
    @InjectModel(Payment.name)
    private readonly paymentModel: Model<PaymentDocument>,
    private httpService: HttpService,
    private eventEmitter: EventEmitter2,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async payWithPaystack(paymentInfo: PayWithPaystackDto): Promise<any> {
    const url = `${process.env.PAYSTACK_API_BASE_URL}/transaction/initialize`;
    const transactionInfo = {
      currency: 'NGN',
      callback_url: 'https://fd9c6bee8d2c.ngrok.io/api/verifyPaystackPayment',
      // callback_url: `http://ef1167a5b1e1.ngrok.io/api/v1/payments/verifyPaystackPayment`,
      channels: ['card', 'bank', 'ussd', 'qr', 'bank_transfer'],
      ...paymentInfo,
    };
    try {
      const response = await firstValueFrom(
        this.httpService.post(url, transactionInfo, this.config),
      );
      if (response) {
        return response.data;
      }
    } catch (error) {
      this.logger.log(error);
    }
  }

  async verifyPaystackPayment(reference: string): Promise<any> {
    const url = `${process.env.PAYSTACK_API_BASE_URL}/transaction/verify/${reference}`;
    // Send 'Get' request to paystack verify endpoint to verify transaction
    const { data } = await firstValueFrom(
      this.httpService.get(url, this.config),
    );
    if (data.status === true && data.data.status === 'success') {
      this.eventEmitter.emit('payment.made', reference);
    }
  }

  async payWithFlutterwave(paymentInfo: MakePaymentDto): Promise<any> {
    const url = `${process.env.FLUTTER_API_BASE_URL}/v3/payments`;
    const { amount, tx_ref } = paymentInfo;
    const customerInfo = {
      currency: 'NGN',
      redirect_url: 'http//localhost:4000/api/v1/verify',
      ...paymentInfo,
      customizations: {
        title: 'Nimbu Logistics',
        description: 'Delivery charge',
        logo: '',
      },
    };
    // Set transaction amount in cache
    await this.cacheManager.set(tx_ref, amount);
    // Make 'Post' request to flutterwave endpoint to make payment
    const { data } = await firstValueFrom(
      this.httpService.post(url, customerInfo, this.config),
    );
    return data;
  }

  create(createPaymentDto: CreatePaymentDto) {
    return 'This action adds a new payment';
  }

  findAll() {
    return `This action returns all payments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
