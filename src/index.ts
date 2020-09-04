import {$log} from "@tsed/common";
import {PlatformExpress} from "@tsed/platform-express";
import {Server} from "./Server";

async function bootstrap() {
	try {
		$log.debug("Start server...");

		/* tslint:disable */
		const config = require("./config/server");
		/* tslint:enable */

		const platform = await PlatformExpress.bootstrap(Server, config);

	await platform.listen();
		$log.debug("Server initialized");
	} catch (er) {
		$log.error(er);
	}
}

bootstrap();