import { Controller, Get } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
	HealthCheckService,
	HttpHealthIndicator,
	HealthCheck,
} from "@nestjs/terminus";
import { DatabaseHealthIndicator } from "./database.health";

@Controller("health")
export class HealthController {
	constructor(
		private health: HealthCheckService,
		private http: HttpHealthIndicator,
		private configService: ConfigService,
		private databaseHealth: DatabaseHealthIndicator,
	) {}

	@Get("test")
	healthCheck() {
		return "Http working fine";
	}

	@Get()
	@HealthCheck()
	check() {
		return this.health.check([
			() =>
				this.http.pingCheck(
					"swagger",
					`http://localhost:${this.configService.get(
						"app.port",
					)}/doc`,
				),
			() =>
				this.http.pingCheck(
					"routes",
					`http://localhost:${this.configService.get(
						"app.port",
					)}/${this.configService.get("app.prefix")}/health/test`,
				),
			() => this.databaseHealth.isHealthy(),
		]);
	}
}
