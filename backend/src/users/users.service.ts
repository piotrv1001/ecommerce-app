import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/users.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user-dto';
import { hashPassword } from 'src/utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const hashedPassword = await hashPassword(createUserDto.password);
    const createdUser = new this.userModel({
      email: createUserDto.email,
      password: hashedPassword,
    });
    return createdUser.save();
  }
}
