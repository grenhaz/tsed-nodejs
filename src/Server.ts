import {Configuration, Inject, PlatformApplication} from "@tsed/common";
import * as bodyParser from "body-parser";
import * as compress from "compression";
import * as cookieParser from "cookie-parser";
import * as methodOverride from "method-override";
import {ejs} from "consolidate";
import "@tsed/typeorm";
import "@tsed/platform-express";
import {GlobalErrorHandlerMiddleware} from "./middlewares/GlobalErrorHandlerMiddleware";
import {NotFoundMiddleware} from "./middlewares/NotFoundMiddleware";

@Configuration({
	rootDir: __dirname
})
export class Server
{
	@Inject()
	app: PlatformApplication;

	@Configuration()
	settings: Configuration;

	public $beforeRoutesInit(): void | Promise<any>
	{
		this.app
			.use(cookieParser())
			.use(compress({}))
			.use(methodOverride())
			.use(bodyParser.json())
			.use(bodyParser.urlencoded({
				extended: true
			}));
			
		this.app.raw.set("views", this.settings.viewsDir);
		this.app.raw.engine("ejs", ejs);
	}
	
	public $afterRoutesInit()
	{
		this.app
			.use(GlobalErrorHandlerMiddleware)
			.use(NotFoundMiddleware);
	}
}