import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { v4 } from "uuid";
import { PitchDeck } from "./PitchDeck";
import { PitchDeckImage } from "./PitchDeckImage";

@Entity()
export class PitchDeckUpload {
  @PrimaryGeneratedColumn("uuid")
  public id!: string;

  @BeforeInsert()
  addId() {
    this.id = v4();
  }

  @CreateDateColumn({ name: "created_at" })
  public createdAt!: Date;

  @Index({ unique: true })
  @Column({ type: "text", nullable: false })
  public filePath!: string;

  @ManyToOne((type) => PitchDeck, (deck) => deck.uploads)
  public pitchDeck!: PitchDeck;

  @OneToMany((type) => PitchDeckImage, (image) => image.upload, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  public images!: PitchDeckImage[];
}
