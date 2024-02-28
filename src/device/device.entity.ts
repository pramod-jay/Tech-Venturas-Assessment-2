import { Gateway } from 'src/gateway/gateway.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Device {
  @PrimaryGeneratedColumn()
  UID: number;

  @Column()
  vendor: string;

  @Column()
  dateCreated: Date;

  @Column({ default: false })
  isOnline: boolean;

  @ManyToOne(() => Gateway, (gateway) => gateway.devices, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  })
  gateway: Gateway
}
