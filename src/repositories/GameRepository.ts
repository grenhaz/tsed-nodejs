import {Repository, EntityRepository} from "typeorm";
import {Game} from "../entities/Game";

@EntityRepository(Game)
export class GameRepository extends Repository<Game>
{
}