import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Res } from "@nestjs/common";
import { GatewayService } from "src/gateway/gateway.service";
import { GatewayDto } from "./dto/gateway.dto";
import { Response } from "express";

@Controller('gateway')
export class GatewayController{

    constructor(private gatewayService: GatewayService) {}

    @Post()
    createGateway(@Body() gatewayDto: GatewayDto, @Res() response: Response){
        return this.gatewayService.createGateway(gatewayDto, response);
    }

    @Get()
    getGateways(@Res() response: Response){
        return this.gatewayService.getGateways(response);
    }

    @Patch(':serialNumber')
    updateIP(@Param() params: any, @Body() gatewayDto: GatewayDto, @Res() response: Response){
        return this.gatewayService.updateIp(params.serialNumber, gatewayDto, response);
    }

    @Put(':serialNumber')
    updateGateway(@Param() params: any, @Body() gatewayDto: GatewayDto, @Res() response: Response){
        return this.gatewayService.updateGateway(params.serialNumber, gatewayDto, response);
    }

    @Get(':serialNumber')
    getGatewayById(@Param() params: any, @Res() response: Response){
        return this.gatewayService.getGatewayByID(params.serialNumber, response);
    }

    @Delete(':serialNumber')
    deleteGateway(@Param() params: any, @Res() response: Response){
        return this.gatewayService.deleteGateway(params.serialNumber, response);
    }
}