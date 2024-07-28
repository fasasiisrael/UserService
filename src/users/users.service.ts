import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../email/email.service';
import bcrypt from "bcrypt";


@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    this.logger.log(`Creating user with data: ${JSON.stringify(createUserDto)}`);
    try {
      const user = this.userRepository.create(createUserDto);
      const savedUser = await this.userRepository.save(user);
      await this.emailService.sendWelcomeEmail(savedUser.email, savedUser.name);
      this.logger.log('User created and welcome email sent');
      return savedUser;
    } catch (error) {
      
      if (error instanceof Error) {
        this.logger.error('Error creating user ============>', error.stack);
      } else {
        this.logger.error('Unknown error occurred during registeration');
      }
      throw error;
    }
  }
  

  async login(loginUserDto: LoginUserDto): Promise<{ access_token: string } | null> {
    this.logger.log(`User login attempt with username: ${loginUserDto.username}`);
    try {
      const user = await this.userRepository.findOne({ where: { email: loginUserDto.username } });
      if (user && await bcrypt.compare(loginUserDto.password, user.password)) {
        const payload = { username: user.name, sub: user.id };
        const access_token = this.jwtService.sign(payload);
        this.logger.log('User successfully logged in');
        return { access_token };
      }
      this.logger.warn('Login failed for username: ' + loginUserDto.username);
      return null;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error('Error logging in   ============>', error.stack);
      } else {
        this.logger.error('Unknown error occurred during signin ');
      }
      throw error;
    }
  }
  
  async findOne(id: string): Promise<User | null> {
    this.logger.log(`Fetching user with ID: ${id}`);
    try {
      return await this.userRepository.findOne({ where: { id } });
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error('Error fetching user ============>', error.stack);
      } else {
        this.logger.error('Unknown error occurred during fetching');
      }
      throw error;
    }
  }
  
  async findOneByUsername(name: string): Promise<User | null> {
    this.logger.log(`Fetching user by username: ${name}`);
    try {
      return await this.userRepository.findOne({ where: { name } });
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error('Error fetching user by name ============>', error.stack);
      } else {
        this.logger.error('Unknown error occurred during fetching');
      }
      throw error;
    }
  }
  
}
