import {
  Controller,
  Query,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dtos/create-payment.dto';
import { UpdatePaymentDto } from './dtos/update-payment.dto';
import { MakePaymentDto } from './dtos/make-payment.dto';
import { VerifyPaymentDto } from './dtos/verify-payments.dto';
import { ApiResponseFormat } from 'src/shared/api-response.dto';

@Controller('/api/v1/payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('verifyPaystackPayment')
  async verifyPaystackPayment(
    @Body('reference') reference: any,
  ): Promise<ApiResponseFormat> {
    const res = await this.paymentsService.verifyPaystackPayment(reference);
    return res;
  }

  @Post('payWithFlutterwave')
  @UsePipes(ValidationPipe)
  async payWithFlutterwave(@Body() data: MakePaymentDto): Promise<string> {
    const response = await this.paymentsService.payWithFlutterwave(data);
    const {
      data: { link },
    } = response;
    return link;
  }

  // @Post('verify')
  // @UsePipes(ValidationPipe)
  // async verifyFlutterwavePayment(
  //   @Query() transactionInfo: VerifyPaymentDto,
  // ): Promise<ApiResponseFormat> {
  //   const res = await this.paymentsService.verifyFlutterwavePayment(transactionInfo);
  //   console.log(res);
  //   return res;
  //   // return await this.paymentsService.verifyPayment(transactionInfo);
  // }

  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @Get()
  findAll() {
    return this.paymentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(+id, updatePaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentsService.remove(+id);
  }
}
