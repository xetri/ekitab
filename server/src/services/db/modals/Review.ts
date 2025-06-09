import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  ManyToOne,
} from "typeorm";

@Entity("reviews")
export class Review {
  @PrimaryColumn()
  id: string;

  @Column( { nullable: true } )
  user: string;

  @Column( { nullable: true } )
  name: string;

  @Column({ type: 'int', nullable: true })
  rating: number;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @Column( { nullable: true } )
  bookId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Review;