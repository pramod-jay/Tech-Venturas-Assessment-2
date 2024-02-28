import { Device } from "src/device/device.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity()
export class Gateway{
    @PrimaryColumn()
    serialNumber: string;

    @Column()
    name: string;

    @Column({length: 15})
    IpAddress: string

    @OneToMany(() => Device, (device) => device.gateway,{
        eager: true
    })
    devices: Device[]
}