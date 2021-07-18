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

@Controller('/api/v1/payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('pay')
  @UsePipes(ValidationPipe)
  async makePayment(@Body() data: MakePaymentDto): Promise<string> {
    const response = await this.paymentsService.makePayment(data);
    console.log(response);
    const {
      data: { link },
    } = response;
    return link;
  }

  @Post('verify')
  @UsePipes(ValidationPipe)
  async verifyPayment(@Query() transactionInfo: VerifyPaymentDto) {
    const { data } = await this.paymentsService.verifyPayment(transactionInfo);
    return data;
  }

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
