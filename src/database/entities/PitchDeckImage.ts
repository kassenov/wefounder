import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { v4 } from "uuid";
import { PitchDeck } from "./PitchDeck";

@Entity()
export class PitchDeckImage {
  @PrimaryGeneratedColumn("uuid")
  public id!: string;

  @BeforeInsert()
  addId() {
    this.id = v4();
  }

  @Index({ unique: true })
  @Column({ type: "text", nullable: false })
  public filePath!: string;

  @ManyToOne((type) => PitchDeck, (deck) => deck.uploads)
  public pitchDeck!: PitchDeck;
}
