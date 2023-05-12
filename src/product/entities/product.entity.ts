import {
  Column,
  CreateDateColumn,
  Entity, JoinTable,
  ManyToMany, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Cart } from "../../cart/cart.entity";
import { Order } from "../../orders/order.entity";
import { Category } from "../../categories/category.entity";
import { ProductImage } from "./product-image.entity";


@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 30})
  name: string;

  @Column({ type: "varchar", length: 100 })
  description: string;

  @ManyToMany(() => Cart, cart => cart.items)
  @JoinTable({name: "product_cart"})
  cart: Cart;

  @ManyToMany(() => Order, order => order.items)
  orders: Order[];

  @Column({ type: "int" })
  price: number;

  @ManyToMany(() => Category, category => category.products)
  category: Category[];

  @OneToMany(() => ProductImage, productImage => productImage.product)
  images: ProductImage[];

  @CreateDateColumn({ type: "date" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "date" })
  updatedAt!: Date;
}