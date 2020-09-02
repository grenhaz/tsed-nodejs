import {Middleware, Req, Res, Next, Err, $log} from "@tsed/common";
import {Exception} from "@tsed/exceptions";

@Middleware()
export class GlobalErrorHandlerMiddleware
{
	use(
		@Err() error: any,
		@Req() request: Req,
		@Res() response: Res
	): any {
		if (response.headersSent) {
			throw error;
		}

		if (error instanceof Exception) {
			response.status(error.status).json({status: error.status, message: error.message});

			return;
		}

		response.status(error.status || 500).json({status: error.status, message: "Internal Error"});

		return;
	}
}