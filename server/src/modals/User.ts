import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Session } from "@/modals";

@Entity("users")
export class User {
    @PrimaryColumn()
    uid: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    passwordHash: string;

    @OneToMany(() => Session, (session) => session.user)
    sessions: Session[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

export default User;