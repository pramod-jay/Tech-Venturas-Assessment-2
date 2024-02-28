import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gateway } from './gateway.entity';
import { GatewayDto } from './dto/gateway.dto';
import { Response } from 'express';

@Injectable()
export class GatewayService {
  constructor(
    @InjectRepository(Gateway)
    private gatewayRepository: Repository<Gateway>
  ) {}

  async createGateway(gatewayDto: GatewayDto, response: Response) {
    try {
      if(gatewayDto.serialNumber === ''){
        return response.status(HttpStatus.BAD_REQUEST).send("Serial number cannot be null");
      }
  
      if(gatewayDto.name === ''){
        return response.status(HttpStatus.BAD_REQUEST).send("Gateway name cannot be null");
      }
  
      if(gatewayDto.ipAddress === ''){
        return response.status(HttpStatus.BAD_REQUEST).send("Gateway IP address cannot be null");
      }
  
      const isGatewayExist = await this.isGatewayExist(gatewayDto.serialNumber);
      if(isGatewayExist){
        return response.status(HttpStatus.CONFLICT).send("Another gateway is already available from this serial number");
      }
  
      if(!this.isValidIp(gatewayDto.ipAddress)){
        return response.status(HttpStatus.BAD_REQUEST).send("IP is not a valid IPv4 address");
      }
  
      const gateway = this.mapToEntity(gatewayDto);
      const result = await this.gatewayRepository.save(gateway)
      console.log(result);
  
      return response.status(HttpStatus.ACCEPTED).send("Gateway has been created successfully");
      
    } catch (error) {
      console.log(error);
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send("Internal server error");
    }
  }

  async getGateways(response: Response){
    try {
      const gateways: Gateway[] = await this.gatewayRepository.find();
  
      if(gateways.length == 0){
        return response.status(HttpStatus.NOT_FOUND).send("There is no any registered gateways");
      }
  
      return response.status(HttpStatus.ACCEPTED).send(gateways);
    } catch (error) {
      console.log(error);
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send("Internal server error");
    }
  }

  async updateIp(gatewayDto:GatewayDto, response: Response){
    try {
      if(gatewayDto.serialNumber === ''){
        return response.status(HttpStatus.BAD_REQUEST).send("Serial number cannot be null");
      }
  
      if(gatewayDto.ipAddress === ''){
        return response.status(HttpStatus.BAD_REQUEST).send("Gateway IP address cannot be null");
      }
  
      const isGatewayExist = await this.isGatewayExist(gatewayDto.serialNumber);
      if(!isGatewayExist){
        return response.status(HttpStatus.NOT_FOUND).send("Gateway not found");
      }
  
      if(!this.isValidIp(gatewayDto.ipAddress)){
        return response.status(HttpStatus.BAD_REQUEST).send("IP is not a valid IPv4 address");
      }
  
      const gateway = await this.gatewayRepository.findOneBy({serialNumber: gatewayDto.serialNumber});
      gateway.IpAddress = gatewayDto.ipAddress
      const result = await this.gatewayRepository.save(gateway);
      
      console.log(result);
      return response.status(HttpStatus.ACCEPTED).send("IP address of gateway has been updated successfully");
    } catch (error) {
      console.log(error);
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send("Internal server error");
    }
  }

  async updateGateway(gatewayDto: GatewayDto, response:Response){
    try {
      if(gatewayDto.serialNumber === ''){
        return response.status(HttpStatus.BAD_REQUEST).send("Serial number cannot be null");
      }
  
      if(gatewayDto.name === ''){
        return response.status(HttpStatus.BAD_REQUEST).send("Gateway name cannot be null");
      }
  
      if(gatewayDto.ipAddress === ''){
        return response.status(HttpStatus.BAD_REQUEST).send("Gateway IP address cannot be null");
      }
  
      const isGatewayExist = await this.isGatewayExist(gatewayDto.serialNumber);
      if(!isGatewayExist){
        return response.status(HttpStatus.NOT_FOUND).send("Gateway not found");
      }
  
      if(!this.isValidIp(gatewayDto.ipAddress)){
        return response.status(HttpStatus.BAD_REQUEST).send("IP is not a valid IPv4 address");
      }
  
      const gateway = await this.gatewayRepository.findOneBy({serialNumber: gatewayDto.serialNumber});
      gateway.name = gatewayDto.name;
      gateway.IpAddress = gatewayDto.ipAddress;
  
      const result = await this.gatewayRepository.save(gateway);
      console.log(result);
  
      return response.status(HttpStatus.ACCEPTED).send("Gateway has been updated successfully")
    } catch (error) {
      console.log(error);
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send("Internal server error");
    }
  }

  async getGatewayByID(gatewayDto: GatewayDto, response: Response){
    try {
      if(gatewayDto.serialNumber === ''){
        return response.status(HttpStatus.BAD_REQUEST).send("Serial number cannot be null");
      }
  
      const isGatewayExist = await this.isGatewayExist(gatewayDto.serialNumber);
      if(!isGatewayExist){
        return response.status(HttpStatus.NOT_FOUND).send("Gateway not found");
      }
  
      const result = await this.gatewayRepository.findOneBy({serialNumber:gatewayDto.serialNumber});
      return response.status(HttpStatus.ACCEPTED).send(result);
    } catch (error) {
      console.log(error);
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send("Internal server error");
    }
  }

  async deleteGateway(gatewayDto: GatewayDto, response: Response){
    try {
      const isGatewayExist = await this.isGatewayExist(gatewayDto.serialNumber);
      if(!isGatewayExist){
        return response.status(HttpStatus.NOT_FOUND).send("Gateway not found");
      }
  
      const result = await this.gatewayRepository.delete({serialNumber: gatewayDto.serialNumber});
  
      console.log(result);
  
      return response.status(HttpStatus.ACCEPTED).send("Gateway has been deleted successfully");
    } catch (error) {
      console.log(error);
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send("Internal server error");
    }
  }

  private async isGatewayExist(serialNumber:string):Promise<boolean>{
    const isGatewayExist = await this.gatewayRepository.existsBy({ serialNumber: serialNumber});
    return isGatewayExist;
  }

  private isValidIp(ipAddress : string):boolean{
    const IPRegex = new RegExp("^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$");
    return IPRegex.test(ipAddress);
  }

  private mapToEntity(gatewayDto: GatewayDto):Gateway{
    const gateway = new Gateway();
    gateway.serialNumber = gatewayDto.serialNumber;
    gateway.name = gatewayDto.name;
    gateway.IpAddress = gatewayDto.ipAddress;
    return gateway;
  }
}