import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";
import { v4 } from "uuid";
import { PitchDeck } from "./PitchDeck";
import { PitchDeckUpload } from "./PitchDeckUpload";

@Entity()
export class PitchDeckImage {
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

  @ManyToOne((type) => PitchDeckUpload, (deck) => deck.images)
  public upload!: PitchDeckUpload;
}
