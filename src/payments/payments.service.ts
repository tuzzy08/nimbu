import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Model } from 'mongoose';
import { CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePaymentDto } from './dtos/create-payment.dto';
import { MakePaymentDto } from './dtos/make-payment.dto';
import { UpdatePaymentDto } from './dtos/update-payment.dto';
import { VerifyPaymentDto } from './dtos/verify-payments.dto';
import { Payment, PaymentDocument } from './schemas/payment-schema';

@Injectable()
export class PaymentsService {
  config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.FLUTTER_API_KEY}`,
    },
  };
  constructor(
    @InjectModel(Payment.name)
    private readonly paymentModel: Model<PaymentDocument>,
    private httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async makePayment(paymentInfo: MakePaymentDto): Promise<any> {
    const url = `${process.env.FLUTTER_API_BASE_URL}/v3/payments`;
    const { amount } = paymentInfo;
    const customerInfo = {
      tx_ref: 'hooli-tx-1920bbtytty',
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
    await this.cacheManager.set('hooli-tx-1920bbtytty', amount);
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
