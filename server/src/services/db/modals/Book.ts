import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from "typeorm";

@Entity("books")
export class Book {
  @PrimaryColumn()
  id: string;

  @Column( { nullable: true } )
  title: string;

  @Column( { nullable: true} )
  author: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'text', array: true, nullable: true })
  categories: string[];

  // @Column({ type: 'float', nullable: true })
  // price: number;

  @Column({ nullable: true })
  sellerId: string;

  @Column({ nullable: true })
  sellerName: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Book;