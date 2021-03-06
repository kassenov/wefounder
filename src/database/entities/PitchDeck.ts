import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { v4 } from "uuid";
import { Company } from "./Company";
import { PitchDeckImage } from "./PitchDeckImage";
import { PitchDeckUpload } from "./PitchDeckUpload";

@Entity()
export class PitchDeck {
  @PrimaryGeneratedColumn("uuid")
  public id!: string;

  @BeforeInsert()
  addId() {
    this.id = v4();
  }

  @Index({ unique: true })
  @Column({ type: "text", nullable: false })
  public slug!: string;

  @ManyToOne((type) => Company, (company) => company.pitchDecks)
  public company!: Company;

  @OneToMany((type) => PitchDeckUpload, (upload) => upload.pitchDeck, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  public uploads!: PitchDeckUpload[];

  @OneToMany((type) => PitchDeckImage, (image) => image.pitchDeck, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  public images!: PitchDeckImage[];
}
