import { Body, Controller, Delete, Get, Patch, Post, Put, Query, Res } from "@nestjs/common";
import { DeviceService } from "./device.service";
import { DeviceDto } from "./dto/device.dto";
import { Response } from "express";

@Controller('device')
export class DeviceController{
    constructor(private deviceService: DeviceService) {}

    @Post('createDevice')
    createDevice(@Body() deviceDto: DeviceDto, @Res() response: Response){
        return this.deviceService.createDevice(deviceDto, response);
    }

    @Get('getDevices')
    getDevices(@Res() response: Response){
        return this.deviceService.getDevices(response);
    }

    @Patch('updateStatus')
    updateStatus(@Body() deviceDto: DeviceDto, @Res() response: Response){
        return this.deviceService.updateStatus(deviceDto, response);
    }

    @Patch('updateGateway')
    updateGateway(@Body() deviceDto: DeviceDto, @Res() response: Response){
        return this.deviceService.updateGateway(deviceDto, response);
    }

    @Put('updateDevice')
    updateDevice(@Body() deviceDto: DeviceDto, @Res() response: Response){
        return this.deviceService.updateDevice(deviceDto, response);
    }

    @Get('getDeviceById')
    getDeviceByID(@Query() deviceDto: DeviceDto, @Res() response: Response){
        return this.deviceService.getDeviceByID(deviceDto, response);
    }

    @Delete('deleteDevice')
    deleteDevcie(@Query() deviceDto: DeviceDto, @Res() response: Response){
        return this.deviceService.deleteDevice(deviceDto, response);
    }
}