import {Required, Property, Description} from "@tsed/common";
import {Column, Entity, PrimaryGeneratedColumn, BaseEntity} from "typeorm";

// TODO: Restrictions
export class GameCreate
{
	@Description("Name")
	@Required()
	name: string;
	
	@Description("Description")
	@Required()
	description: string;
}

@Entity({name: "games"})
export class Game extends BaseEntity
{
	@Description("Id")
	@Property()
	@PrimaryGeneratedColumn()
    id: number;
	
	@Description("Name")
	@Property()
	@Column()
	name: string;
	
	@Description("Description")
	@Property()
	@Column()
	description: string;
}