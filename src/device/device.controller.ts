import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Res } from "@nestjs/common";
import { DeviceService } from "./device.service";
import { DeviceDto } from "./dto/device.dto";
import { Response } from "express";

@Controller('device')
export class DeviceController{
    constructor(private deviceService: DeviceService) {}

    @Post()
    createDevice(@Body() deviceDto: DeviceDto, @Res() response: Response){
        return this.deviceService.createDevice(deviceDto, response);
    }

    @Get()
    getDevices(@Res() response: Response){
        return this.deviceService.getDevices(response);
    }

    @Patch(':uid')
    updateStatus(@Param() params: any, @Body() deviceDto: DeviceDto, @Res() response: Response){
        return this.deviceService.patchDevice(params.uid, deviceDto, response);
    }

    @Put(':uid')
    updateDevice(@Param() params: any, @Body() deviceDto: DeviceDto, @Res() response: Response){
        return this.deviceService.updateDevice(params.uid, deviceDto, response);
    }

    @Get(':uid')
    getDeviceByID(@Param() params: any, @Res() response: Response){
        return this.deviceService.getDeviceByID(params.uid, response);
    }

    @Delete(':uid')
    deleteDevcie(@Param() params: any, @Res() response: Response){
        return this.deviceService.deleteDevice(params.uid, response);
    }
}