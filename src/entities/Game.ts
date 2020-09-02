import {Required, Property} from "@tsed/common";
import {Column, Entity, PrimaryGeneratedColumn, BaseEntity} from "typeorm";

// TODO: Restrictions
export class GameCreate
{
	@Required()
	name: string;
	
	@Property()
	description: string;
}

@Entity({name: "games"})
export class Game extends BaseEntity
{
	@PrimaryGeneratedColumn()
    id: number;
	
	@Column()
	name: string;
	
	@Column()
	description: string;
}