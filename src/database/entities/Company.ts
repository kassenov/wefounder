import {
    BeforeInsert,
    Column,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 } from 'uuid';
import { PitchDeck } from './PitchDeck';

@Entity()
export class Company {
    @PrimaryGeneratedColumn('uuid')
    public id!: string;

    @BeforeInsert()
    addId() {
        this.id = v4();
    }

    @Index({ unique: true })
    @Column({ type: 'text', nullable: false })
    public slug!: string;

    @OneToMany(type => PitchDeck, pitchDeck => pitchDeck.company)
    public pitchDecks!: PitchDeck[];
}