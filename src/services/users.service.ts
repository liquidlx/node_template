import { Injectable } from "@nestjs/common";
import { Prisma, Users } from "@prisma/client";
import { PrismaService } from ".";

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    /**
     * Create a new user if it's not existed, otherwise do nothing
     *
     * @param user
     * @returns User
     */
    async create(data): Promise<Users> {
        const { id } = data;

        return this.prisma.users.upsert({
            where: {
                id
            },
            update: {},
            create: data,
        });
    }

    /**
     * Update a user
     *
     * @param data
     * @returns User
     */
    async update(data): Promise<Users> {
        const { id } = data;

        return this.prisma.users.update({
            where: {
                id
            },
            data
        })
    }

    /**
     * Delete a user by id
     *
     * @param where
     * @returns User
     */
    async delete(where: Prisma.UsersWhereUniqueInput,): Promise<Users> {
        return this.prisma.users.delete({
            where
        })
    }

    /**
     * Find user by id
     *
     * @param where
     * @returns User
     */
    async findOne(where: Prisma.UsersWhereUniqueInput): Promise<Users | null> {
        return this.prisma.users.findUnique({
            where
        })
    }

    /**
     * Find all users
     *
     * @param where
     * @returns Users Array
     */
    async findAll(where: Prisma.UsersWhereInput): Promise<Users[]> {
        return this.prisma.users.findMany({
            where
        })
    }
}