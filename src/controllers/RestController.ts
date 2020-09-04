import {
	Controller, Get, Post, Put, Delete, Inject, PathParams,
	BodyParams, Required, Returns, ReturnsArray, Description
} from "@tsed/common";
import {NotFound} from "@tsed/exceptions";
import {GameService} from "../services/GameService";
import {Game, GameCreate} from "../entities/Game";
import {Name, Summary} from "@tsed/swagger";

@Name("games")
@Controller("/games")
export class RestController
{
	@Inject()
	private readonly gameService: GameService;
	
	@Summary("Return a list of games")
	@ReturnsArray(Game)
	@Get("/")
	async games(): Promise<Game[]>
	{
		return this.gameService.findAll();
	}
	
	@Summary("Return a game")
	@Returns(Game)
	@Returns(404, {description: "Game not found"})
	@Get("/:id")
	async game(
		@Description("Game Id") @PathParams("id") id: number
	): Promise<Game>
	{
		const game: Game = await this.gameService.findOne(id);
		if (game) {
			return game;
		} else {
			throw new NotFound("Game not found");
		}
	}
	
	@Summary("Create a game")
	@Returns(Game)
	@Post()
	async create(
		@BodyParams() @Required() gameData: GameCreate
	): Promise<Game>
	{
		return this.gameService.create({...gameData});
	}
	
	@Summary("Update a game")
	@Returns(Game)
	@Returns(404, {description: "Game not found"})
	@Put("/:id")
	async update(
		@Description("Game Id") @PathParams("id") id: number,
		@BodyParams() @Required() gameData: GameCreate
	): Promise<Game>
	{
		return this.gameService.update({id, ...gameData});
	}
	
	@Summary("Delete a game")
	@Returns(404, {description: "Game not found"})
	@Delete("/:id")
	async remove(
		@Description("Game Id") @PathParams("id") id: number
	): Promise<any>
	{
		return this.gameService.remove(id);
	}
}