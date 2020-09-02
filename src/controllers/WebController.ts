import {Controller, Get, Render, Inject} from "@tsed/common";
import {GameService} from "../services/GameService";
import {Game} from "../entities/Game";

@Controller("/")
export class WebController
{
	@Inject()
	private gameService: GameService;
	
	@Get()
	@Render("index.ejs")
	async index(): Promise<any>
	{
		return {
			games: await this.gameService.findAll()
		};
	}
}