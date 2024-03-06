import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gateway } from './gateway.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Gateway])],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}