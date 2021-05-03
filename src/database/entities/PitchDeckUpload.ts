import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    Index,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 } from 'uuid';
import { PitchDeck } from './PitchDeck';

@Entity()
export class PitchDeckUpload {
    @PrimaryGeneratedColumn('uuid')
    public id!: string;

    @BeforeInsert()
    addId() {
        this.id = v4();
    }

    @CreateDateColumn({ name: 'created_at' })
    public createdAt!: Date;

    @Index({ unique: true })
    @Column({ type: 'text', nullable: false })
    public fileName!: string;

    @Index({ unique: true })
    @Column({ type: 'text', nullable: false })
    public originalFileName!: string;

    @ManyToOne(type => PitchDeck, deck => deck.uploads)
    public pitchDeck!: PitchDeck;
}