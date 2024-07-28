import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'd9b2d63d-a233-4123-847a-6baf26c7a7f4', description: 'The unique identifier of the user' })
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty({ example: 'Fasasi Israel', description: 'The name of the user' })
  name!: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  @ApiProperty({ example: 'iszysax1@gmail.com', description: 'The email of the user' })
  email!: string;

  @Column()
  @ApiProperty({ example: 'hashedpassword', description: 'The hashed password of the user' })
  password!: string;
}
