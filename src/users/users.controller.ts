import {
  Logger,
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.', type: User })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    this.logger.log(`Registering user with data ==========>>: ${JSON.stringify(createUserDto)}`);
    try {
      const user = await this.userService.create(createUserDto);
      this.logger.log(`User successfully registered with ID: ${user.id}`);
      return user;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error('Error creating user ============>', error.stack);
      } else {
        this.logger.error('Unknown error occurred during registeration');
      }
      throw error;
    }
  }

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'Successful login', type: Object })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginUserDto: LoginUserDto): Promise<{ access_token: string }> {
    this.logger.log(`User login attempt with email==============>: ${loginUserDto.email}`);
    try {
      const result = await this.userService.login(loginUserDto);
      if (!result) {
        this.logger.warn('Login failed for email: ===========> ' + loginUserDto.email);
        throw new UnauthorizedException('Invalid credentials');
      }
      this.logger.log('User successfully logged in');
      return result;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error('Error during login ============>', error.stack);
      } else {
        this.logger.error('Unknown error occurred during login');
      }
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user details' })
  @ApiResponse({ status: 200, description: 'User details', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiBearerAuth()
  async findOne(@Param('id') id: string): Promise<User> {
    this.logger.log(`Fetching user with ID =====================>: ${id}`);
    try {
      const user = await this.userService.findOne(id);
      if (!user) {
        this.logger.warn('User not found with ID: ===============> ' + id);
        throw new NotFoundException('User not found');
      }
      this.logger.log('User details retrieved successfully');
      return user;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error('Error teching user ============>', error.stack);
      } else {
        this.logger.error('Unknown error occurred during retrive');
      }
      throw error;
    }
  }
}
