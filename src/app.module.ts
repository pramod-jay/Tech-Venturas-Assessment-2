import { Module } from '@nestjs/common';
import { GatewayModule } from './gateway/gateway.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceModule } from './device/device.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.PORT),
    username: process.env.DATABASE_USER ,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    entities: [__dirname + '/**/*.entity.{ts,js}'],
    synchronize: true,
    ssl  : {
      rejectUnauthorized: false
    }
  }),
  GatewayModule,
  DeviceModule
],
  controllers: [],
  providers: [],
})
export class AppModule {}
