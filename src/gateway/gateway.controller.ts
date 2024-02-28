import { Body, Controller, Delete, Get, Patch, Post, Put, Query, Res } from "@nestjs/common";
import { GatewayService } from "src/gateway/gateway.service";
import { GatewayDto } from "./dto/gateway.dto";
import { Response } from "express";

@Controller('gateway')
export class GatewayController{

    constructor(private gatewayService: GatewayService) {}

    @Post('createGateway')
    createGateway(@Body() gatewayDto: GatewayDto, @Res() response: Response){
        return this.gatewayService.createGateway(gatewayDto, response);
    }

    @Get('getGateways')
    getGateways(@Res() response: Response){
        return this.gatewayService.getGateways(response);
    }

    @Patch('updateIp')
    updateIP(@Body() gatewayDto: GatewayDto, @Res() response: Response){
        return this.gatewayService.updateIp(gatewayDto, response);
    }

    @Put('updateGateway')
    updateGateway(@Body() gatewayDto: GatewayDto, @Res() response: Response){
        return this.gatewayService.updateGateway(gatewayDto, response);
    }

    @Get('getGatewayById')
    getGatewayById(@Query() gatewayDto:GatewayDto, @Res() response: Response){
        return this.gatewayService.getGatewayByID(gatewayDto, response);
    }

    @Delete('deleteGateway')
    deleteGateway(@Query() gatewayDto: GatewayDto, @Res() response: Response){
        return this.gatewayService.deleteGateway(gatewayDto, response);
    }
}