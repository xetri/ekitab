import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from "typeorm";

@Entity("orders")
export class Order {
  @PrimaryColumn()
  id: string;

  @Column( { nullable: true } )
  buyerId: string;

  @Column( { nullable: true } )
  bookId: string;

  @Column( { type: 'float', nullable: true} )
  amount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Order;