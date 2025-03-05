import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { User } from "./User";

export enum OrganizationType {
    COMPANY = "company",
    UNIVERSITY = "university"
}

@Entity("organizations")
export class Organization {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    name!: string;

    @Column({
        type: "enum",
        enum: OrganizationType
    })
    type!: OrganizationType;

    @Column({ nullable: true })
    description!: string;

    @ManyToOne(() => User, user => user.organizations, { eager: true })
    @JoinColumn({ name: 'ownerId' })
    owner!: User;

    @Column()
    ownerId!: string;

    @Column({ default: true })
    isActive!: boolean;

    @Column({ nullable: true })
    logoUrl!: string;

    @Column({ type: 'jsonb', nullable: true })
    settings!: Record<string, any>;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}