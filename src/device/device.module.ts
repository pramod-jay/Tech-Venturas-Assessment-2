import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Device } from "./device.entity";
import { DeviceController } from "./device.controller";
import { DeviceService } from "./device.service";
import { Gateway } from "src/gateway/gateway.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Device, Gateway])],
    controllers: [DeviceController],
    providers: [DeviceService]
}) 

export class DeviceModule {}