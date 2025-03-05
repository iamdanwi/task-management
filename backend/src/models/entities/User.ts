import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Organization } from './Organization';
import crypto from 'crypto';

export enum UserRole {
    ADMIN = "admin",
    USER = "user"
}

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Column()
    name!: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER
    })
    role: UserRole = UserRole.USER;

    @Column({ default: false })
    isEmailVerified: boolean = false;

    @Column({ type: 'varchar', nullable: true })
    passwordResetToken!: string | null;

    @Column({ type: 'timestamp', nullable: true })
    passwordResetExpires!: Date | null;

    @Column({ type: 'varchar', nullable: true })
    emailVerificationToken!: string | null;

    @Column({ type: 'timestamp', nullable: true })
    emailVerificationExpires!: Date | null;

    @OneToMany(() => Organization, organization => organization.owner, { cascade: true })
    organizations!: Organization[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    constructor(data?: Partial<User>) {
        this.id = data?.id || crypto.randomUUID();
        this.email = data?.email || '';
        this.password = data?.password || '';
        this.name = data?.name || '';
        this.role = data?.role || UserRole.USER;
        this.isEmailVerified = data?.isEmailVerified || false;
        this.passwordResetToken = data?.passwordResetToken || null;
        this.passwordResetExpires = data?.passwordResetExpires || null;
        this.emailVerificationToken = data?.emailVerificationToken || null;
        this.emailVerificationExpires = data?.emailVerificationExpires || null;
        this.createdAt = data?.createdAt || new Date();
        this.updatedAt = data?.updatedAt || new Date();
    }
}