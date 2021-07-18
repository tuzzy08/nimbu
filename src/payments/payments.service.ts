import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { CreatePaymentDto } from './dtos/create-payment.dto';
import { MakePaymentDto } from './dtos/make-payment.dto';
import { UpdatePaymentDto } from './dtos/update-payment.dto';
import { VerifyPaymentDto } from './dtos/verify-payments.dto';

@Injectable()
export class PaymentsService {
  config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.FLUTTER_API_KEY}`,
    },
  };
  constructor(private httpService: HttpService) {}

  async makePayment(paymentInfo: MakePaymentDto): Promise<any> {
    const url = 'https://api.flutterwave.com/v3/payments';
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

    const { data } = await firstValueFrom(
      this.httpService.post(url, customerInfo, this.config),
    );
    return data;
  }

  async verifyPayment(transactionInfo: VerifyPaymentDto) {
    const url = `https://api.flutterwave.com/v3/transactions/${transactionInfo.tx_ref}/verify`;
    return await firstValueFrom(this.httpService.get(url, this.config));
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
