import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';


@Entity("books")
export class Book {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'text', array: true })
  categories: string[];

  @Column({ type: 'float' })
  price: number;

  @Column()
  sellerId: string;

  @Column({ nullable: true })
  language: string;

  @Column({ type: 'int', nullable: true })
  pages: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Book;