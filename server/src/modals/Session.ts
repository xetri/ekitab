import { Entity, Column, PrimaryColumn, CreateDateColumn, ManyToOne } from "typeorm";
import { User } from "@/modals";

@Entity("sessions")
export class Session {
    @PrimaryColumn()
    uid: string;

    @Column()
    key: string;

    @ManyToOne(() => User, (user) => user.sessions)
    user: User;

    @Column()
    expAt: Date;

    @CreateDateColumn()
    createdAt: Date;
}

export default Session;