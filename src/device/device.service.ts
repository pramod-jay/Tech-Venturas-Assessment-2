import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Device } from "./device.entity";
import { Repository } from "typeorm";
import { DeviceDto } from "./dto/device.dto";
import { Response } from "express";
import { Gateway } from "src/gateway/gateway.entity";
import * as moment from "moment";

@Injectable()
export class DeviceService{
    constructor(
        @InjectRepository(Device)
        private deviceRepository: Repository<Device>,

        @InjectRepository(Gateway)
        private gatewayRepository: Repository<Gateway>
    ) {}

    async createDevice(deviceDto:DeviceDto, response: Response){
        try {
            if(deviceDto.vendor === ''){
                return response.status(HttpStatus.BAD_REQUEST).send("Vendor cannot be null");
            }
    
            if(deviceDto.isOnline == null){
                return response.status(HttpStatus.BAD_REQUEST).send("Set online status as true or false");
            }
    
            let gateway = null;
    
            if(deviceDto.serialNumber != ''){
                gateway = await this.gatewayRepository.findOneBy({serialNumber: deviceDto.serialNumber});
                if(gateway == null){
                    return response.status(HttpStatus.NOT_FOUND).send("Gateway not found");
                }
    
                const rowCount = await this.gatewayRepository.query(`SELECT COUNT(uid) as rowCount FROM techventuras.device WHERE gatewaySerialNumber = '${deviceDto.serialNumber}'`);
    
                if(rowCount[0].rowCount == 10){
                    return response.status(HttpStatus.BAD_REQUEST).send("Cannot connect devices more than 10 to the device -> " + deviceDto.serialNumber);
                }
            }

            console.log(gateway);
    
            let device = this.mapToEntity(deviceDto);
            device.gateway=gateway;
    
            const result = await this.deviceRepository.save(device);
    
            console.log(result);
    
            return response.status(HttpStatus.ACCEPTED).send("Device has been created successfully");
        } catch (error) {
            console.log(error);
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send("Internal server error");
        }
    }

    async getDevices(response: Response){
        try {
            const devices: Device[] = await this.deviceRepository.find();
    
            if(devices.length == 0){
                return response.status(HttpStatus.NOT_FOUND).send("There is no any registered devices");
            }
    
            return response.status(HttpStatus.ACCEPTED).send(devices);
        } catch (error) {
            console.log(error);
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send("Internal server error");
        }
    }

    async updateStatus(deviceDto: DeviceDto, response: Response){
        try {
            const isDeviceExist = await this.isDeviceExist(deviceDto.UID);
            if(!isDeviceExist){
                return response.status(HttpStatus.NOT_FOUND).send("Device not found");
            }
    
            let device = await this.deviceRepository.findOneBy({UID:deviceDto.UID});
            device.isOnline = deviceDto.isOnline;
    
            const result = await this.deviceRepository.save(device);
            console.log(result);
            return response.status(HttpStatus.ACCEPTED).send("Status of device has been updated successfully");
        } catch (error) {
            console.log(error);
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send("Internal server error");
        }
    }

    async updateGateway(deviceDto: DeviceDto, response: Response){
        try {
            const isDeviceExist = await this.isDeviceExist(deviceDto.UID);
            if(!isDeviceExist){
                return response.status(HttpStatus.NOT_FOUND).send("Device not found");
            }

            let gateway = null;
    
            if (deviceDto.serialNumber != '') {
                gateway = await this.gatewayRepository.findOneBy({serialNumber: deviceDto.serialNumber});
                if(gateway == null){
                    return response.status(HttpStatus.NOT_FOUND).send("Gateway not found");
                }
        
                const rowCount = await this.gatewayRepository.query(`SELECT COUNT(uid) as rowCount FROM techventuras.device WHERE gatewaySerialNumber = '${deviceDto.serialNumber}'`);
            
                if(rowCount[0].rowCount == 10){
                    return response.status(HttpStatus.BAD_REQUEST).send("Cannot connect devices more than 10 to the device -> " + deviceDto.serialNumber);
                }
            }
    
            let device = await this.deviceRepository.findOneBy({UID: deviceDto.UID});
            device.gateway = gateway;
    
            const result = await this.deviceRepository.save(device);
    
            console.log(result);
    
            return response.status(HttpStatus.ACCEPTED).send("Gateway of device has been updated successfully");
        } catch (error) {
            console.log(error);
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send("Internal server error");
        }
    }

    async updateDevice(deviceDto: DeviceDto, response: Response){
        try {
            const isDeviceExist = await this.isDeviceExist(deviceDto.UID);
            if(!isDeviceExist){
                return response.status(HttpStatus.NOT_FOUND).send("Device not found");
            }
    
            if(deviceDto.vendor === ''){
                return response.status(HttpStatus.BAD_REQUEST).send("Vendor cannot be null");
            }
    
            if(deviceDto.isOnline == null){
                return response.status(HttpStatus.BAD_REQUEST).send("Set online status as true or false");
            }
    
            let gateway = null;
        
            if(deviceDto.serialNumber != ''){
                gateway = await this.gatewayRepository.findOneBy({serialNumber: deviceDto.serialNumber});
                if(gateway == null){
                    return response.status(HttpStatus.NOT_FOUND).send("Gateway not found");
                }
    
                const rowCount = await this.gatewayRepository.query(`SELECT COUNT(uid) as rowCount FROM techventuras.device WHERE gatewaySerialNumber = '${deviceDto.serialNumber}'`);
    
                if(rowCount[0].rowCount == 10){
                    return response.status(HttpStatus.BAD_REQUEST).send("Cannot connect devices more than 10 to the device -> " + deviceDto.serialNumber);
                }
            }
    
            let device = await this.deviceRepository.findOneBy({UID:deviceDto.UID});
            device.dateCreated = new Date(moment().format('yyyy-MM-DD'));
            device.isOnline = deviceDto.isOnline;
            device.vendor = deviceDto.vendor;
            device.gateway = gateway;
    
            const result = await this.deviceRepository.save(device);
    
            console.log(result);
    
            return response.status(HttpStatus.ACCEPTED).send("Device has been updated successfully");
        } catch (error) {
            console.log(error);
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send("Internal server error");
        }
    }

    async getDeviceByID(deviceDto: DeviceDto, response: Response){
        try {
            const device = await this.deviceRepository.findOneBy({UID:deviceDto.UID});
            if(device == null){
                return response.status(HttpStatus.NOT_FOUND).send("Device not found");
            }
    
            return response.status(HttpStatus.ACCEPTED).send(device);
        } catch (error) {
            console.log(error);
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send("Internal server error");
        }
    }

    async deleteDevice(deviceDto: DeviceDto, response: Response){
        try {
            const isDeviceExist = await this.isDeviceExist(deviceDto.UID);
            if(!isDeviceExist){
                return response.status(HttpStatus.NOT_FOUND).send("Device not found");
            }
    
            const result = await this.deviceRepository.delete({UID: deviceDto.UID});
            
            console.log(result);
    
            return response.status(HttpStatus.ACCEPTED).send("Device has been deleted successfully");
        } catch (error) {
            console.log(error);
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send("Internal server error");
        }
    }
    
    private async isDeviceExist(UID:number):Promise<boolean>{
        const isDeviceExist = await this.deviceRepository.existsBy({ UID: UID});
        return isDeviceExist;
      }

    private mapToEntity(deviceDto: DeviceDto):Device{
        const device = new Device();
        device.dateCreated = new Date(moment().format('yyyy-MM-DD'));
        device.isOnline = deviceDto.isOnline;
        device.vendor = deviceDto.vendor;
        return device;
      }
}