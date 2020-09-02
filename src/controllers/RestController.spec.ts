import {PlatformTest} from "@tsed/common";
import {getRepository} from "typeorm";
import * as SuperTest from "supertest";
import {Server} from "../Server";
import {Game} from "../entities/Game";

describe("Rest controller", () => {
	let request: SuperTest.SuperTest<SuperTest.Test>;
	let game: Game;
	
	beforeAll(PlatformTest.bootstrap(Server, {
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
	
	it("GET /rest/games", async () => {
		const response = await request.get("/rest/games").expect(200);
	});
	
	it("GET /rest/games/:id", async () => {
		const response = await request.get("/rest/games/" + game.id).expect(200);
		const responseNotFound = await request.get("/rest/games/" + game.id + 1).expect(404);
	});
	
	it("POST /rest/games", async () => {
		const response = await request.post("/rest/games").send({name: "Test", description: "Test"}).expect(200);
	});

	it("PUT /rest/games/:id", async () => {
		const response = await request.put("/rest/games/" + game.id).send({name: "Test", description: "Test"}).expect(200);
		const responseNotFound = await request.put("/rest/games/" + game.id + 1).send({name: "Test", description: "Test"}).expect(404);
	});

	it("DELETE /rest/games/:id", async () => {
		const response = await request.delete("/rest/games/" + game.id).expect(200);
		const responseNotFound = await request.delete("/rest/games/" + game.id + 1).expect(404);
	});
});