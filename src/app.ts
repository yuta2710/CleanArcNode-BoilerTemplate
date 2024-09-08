import { envs } from "./core";
import { Server } from "./server";
import { AppRoutes } from "./routes";

(() => {
  main()
})()

function main(): void {
  const server = new Server({
    port: envs.PORT,
    apiPrefix: envs.API_PREFIX,
    routes: AppRoutes.routes
  })

  void server.start();
}