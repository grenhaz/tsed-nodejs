import {PlatformTest} from "@tsed/common";
import {getRepository} from "typeorm";
import * as SuperTest from "supertest";
import {Server} from "../Server";
import {Game} from "../entities/Game";
import * as ejs from "ejs";

describe("Web controller", () => {
	let request: SuperTest.SuperTest<SuperTest.Test>;
	let game: Game;
	
	beforeAll(PlatformTest.bootstrap(Server, {
		"viewsDir": "${rootDir}/views",
		"mount": {
			"/": "${rootDir}/controllers/WebController.ts"
		},
		"typeorm": [
			{
				"name": "default",
				"type": "sqlite",
				"database": ":memory:",
				"entities": [Game],
				"synchronize": true,
				"logging": false
			}
		]
	}));
	beforeAll(async () => {
		request = SuperTest(PlatformTest.callback());
		
		const repository = getRepository(Game);
		
		game = new Game();
		game.name = "Test";
		game.description = "Test";
		game = await repository.save(game);
	});
	afterAll(PlatformTest.reset);
	
	it("GET /", async () => {
		const response = await request.get("/").expect(200);
		const responseNotFound = await request.get("/notfound").expect(404);
	});
});