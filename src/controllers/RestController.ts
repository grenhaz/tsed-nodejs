import {Controller, Get, Post, Put, Delete, Render, Inject, PathParams, BodyParams, Required} from "@tsed/common";
import {NotFound} from "@tsed/exceptions";
import {GameService} from "../services/GameService";
import {Game, GameCreate} from "../entities/Game";

@Controller("/games")
export class RestController
{
	@Inject()
	private readonly gameService: GameService;
	
	@Get("/")
	async games(): Promise<Game[]>
	{
		return this.gameService.findAll();
	}
	
	@Get("/:id")
	async game(
		@PathParams("id") id: number
	): Promise<Game>
	{
		const game: Game = await this.gameService.findOne(id);
		if (game) {
			return game;
		} else {
			throw new NotFound("Game not found");
		}
	}
	
	@Post()
	async create(
		@BodyParams() @Required() gameData: GameCreate
	): Promise<Game>
	{
		return this.gameService.create({...gameData});
	}
	
	@Put("/:id")
	async update(
		@PathParams("id") id: number,
		@BodyParams() @Required() gameData: GameCreate
	): Promise<Game>
	{
		return this.gameService.update({id, ...gameData});
	}
	
	@Delete("/:id")
	async remove(
		@PathParams("id") id: number
	): Promise<any>
	{
		return this.gameService.remove(id);
	}
}