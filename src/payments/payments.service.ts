import { Inject, Injectable, CACHE_MANAGER } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Model } from 'mongoose';
import { Cache } from 'cache-manager';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { CreatePaymentDto } from './dtos/create-payment.dto';
import { MakePaymentDto } from './dtos/make-payment.dto';
import { UpdatePaymentDto } from './dtos/update-payment.dto';
import { VerifyPaymentDto } from './dtos/verify-payments.dto';
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
  constructor(
    @InjectModel(Payment.name)
    private readonly paymentModel: Model<PaymentDocument>,
    private httpService: HttpService,
    private eventEmitter: EventEmitter2,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async payWithPaystack(paymentInfo: PayWithPaystackDto): Promise<any> {
    const url = `${process.env.PAYSTACK_API_BASE_URL}/transaction/initialize`;
    const id = uuidv4();
    const transactionInfo = {
      currency: 'NGN',
      reference: `nimbu-${id}`,
      channels: ['card', 'bank', 'ussd', 'qr', 'bank_transfer'],
      ...paymentInfo,
    };
    try {
      const response = await firstValueFrom(
        this.httpService.post(url, transactionInfo, this.config),
      );
      if (response) {
        console.log(response.data);
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async makePayment(paymentInfo: MakePaymentDto): Promise<any> {
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

  async verifyPayment(transactionInfo: VerifyPaymentDto) {
    const url = `${process.env.FLUTTER_API_BASE_URL}/v3/transactions/${transactionInfo.tx_ref}/verify`;
    // Get cached transaction amount
    const cached_tx_amount = await this.cacheManager.get(
      transactionInfo.tx_ref,
    );
    if (!cached_tx_amount) {
      return { status: 'error', message: 'Invalid Transaction', data: null };
    }
    // Send 'Get' request to flutterwave verify endpoint to verify transaction
    const { data } = await firstValueFrom(
      this.httpService.get(url, this.config),
    );
    console.log(`Verification response`);
    console.log(data);
    if (data.status !== 'success') {
      return { status: 'error', message: data.message, data: null };
    }
    // On succesful verification, destructure transaction parameters to confirm
    const { tx_ref: response_tx_ref, response_amount, currency } = data.data;
    // Check if any parameters don't match
    if (
      response_tx_ref !== transactionInfo.tx_ref ||
      cached_tx_amount !== response_amount ||
      currency !== 'NGN'
    ) {
      this.eventEmitter.emit('payment.made', {
        tx_ref: response_tx_ref,
        response_amount,
        currency,
      });
      return {
        status: 'error',
        message: 'Invalid Transaction',
        data: null,
      };
    }
    return { status: 'success', message: 'Payment succesful', data: null };
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
