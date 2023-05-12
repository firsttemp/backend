import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "./product.entity";


@Entity()
export class ProductImage {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar" })
  url: string;

  @ManyToOne(() => Product, product => product.images)
  product: Product;

  @CreateDateColumn({ type: "date" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "date" })
  updatedAt!: Date;
}