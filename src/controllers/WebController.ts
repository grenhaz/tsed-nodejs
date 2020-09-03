import {Controller, Get, View, Inject} from "@tsed/common";
import {GameService} from "../services/GameService";
import {Hidden} from "@tsed/swagger";

@Hidden()
@Controller("/")
export class WebController
{
	@Inject()
	private gameService: GameService;
	
	@Get()
	@View("index.ejs")
	async index(): Promise<any>
	{
		return {
			games: await this.gameService.findAll()
		};
	}
}