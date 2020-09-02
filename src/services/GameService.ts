import {Service, Inject} from "@tsed/common";
import {NotFound} from "@tsed/exceptions";
import {GameRepository} from "../repositories/GameRepository";
import {Game, GameCreate} from "../entities/Game";

@Service()
export class GameService
{
	@Inject()
	private gameRepository: GameRepository;
	
	async findAll(): Promise<Game[]>
	{
		return await this.gameRepository.find();
	}
	
	async findOne(id: number): Promise<Game>
	{
		return await this.gameRepository.findOne(id);
	}
	
	async create(game: Partial<Game>)
	{
		const nGame: Game = new Game();
		nGame.name = game.name;
		nGame.description = game.description;
		
		return this.gameRepository.save(nGame);
	}

	async update(game: Partial<Game>)
	{
		const gameSearch = await this.findOne(game.id);
		
		if (!gameSearch) {
			throw new NotFound("Game not found");
		}
		
		return this.gameRepository.save(game);
	}
	
	async remove(id: number)
	{
		const gameSearch = await this.findOne(id);

		if (!gameSearch) {
			throw new NotFound("Game not found");
		}

		this.gameRepository.delete(gameSearch);
	}
}