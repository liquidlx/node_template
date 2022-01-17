import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { Users } from "@prisma/client";
import { PatchUsersRequest, PostUsersRequest } from "src/entities/requests/users.request";
import { UsersService } from "src/services";
import * as bcrypt from 'bcrypt';
import { UserDto } from "src/entities/dtos/UserDTO";

@Controller('users')
export class UserController {
    constructor(private readonly usersService: UsersService) { }

    @Get(':id')
    async find(@Param('id') id: string): Promise<UserDto | null> {
        return this.usersService.findOne({ id });
    }

    @Get()
    async findAll(): Promise<UserDto[] | null> {
        return this.usersService.findAll({})
    }

    @Post()
    async create(@Body() body: PostUsersRequest): Promise<UserDto> {
        // encrypt password
        body.password = await bcrypt.hash(body.password, 8);

        return this.usersService.create(body);
    }

    @Delete(':id')
    @HttpCode(204)
    async delete(@Param('id') id: string): Promise<Users | null> {
        return this.usersService.delete({ id });
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() body: PatchUsersRequest): Promise<UserDto> {
        // encrypt password
        if (body.password) {
            body.password = await bcrypt.hash(body.password, 8);
        }

        body.id = id;

        return this.usersService.update(body);
    }
}