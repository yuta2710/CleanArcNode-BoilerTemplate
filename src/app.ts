import { envs } from "./core";
import { Server } from "./server";
import { AppRoutes } from "./routes";

(() => {
  main()
})()

function main(): void {

  console.log("Fuck " + envs.API_PREFIX)
  const server = new Server({
    port: envs.PORT,
    apiPrefix: envs.API_PREFIX,
    routes: AppRoutes.routes
  })

  void server.start();
}