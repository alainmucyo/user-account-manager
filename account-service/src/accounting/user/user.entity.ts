import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import * as bcrypt from "bcrypt";
import { Exclude } from "class-transformer";
import { Gender } from "./model/gender.model";
import { MaritalStatus } from "./model/marital-status.model";
import { UserDetail } from "../user-detail/user-detail.entity";
import { Roles } from "./model/role.model";
import { AccountStateModel } from "./model/account-state.model";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  gender: Gender;

  @Column()
  maritalStatus: MaritalStatus;

  @Column()
  nationality: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phoneNumber: string;

  @Column()
  dateOfBirth: Date;

  @Column({ nullable: true })
  profilePicture: string;

  @OneToOne(() => UserDetail, (userDetail) => userDetail.user)
  detail: UserDetail;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: Roles.User })
  role: Roles;

  @Column({ default: AccountStateModel.Unverified })
  state: AccountStateModel;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}
