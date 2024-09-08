import { Router } from "express";

import { TodoLocalDatasourceImpl, TodoRepositoryImpl } from "../infrastructure";
import { TodoController } from "./controller";
// import { AuthDatasourceImpl, AuthMiddleware, AuthRepositoryImpl } from '../../auth';

export class TodoRoutes {
  static get routes(): Router {
    const router = Router();

    //* This datasource can be change
    const datasource = new TodoLocalDatasourceImpl();
    const repository = new TodoRepositoryImpl(datasource);
    const controller = new TodoController(repository);

    // // * Authentication middleware
    // const authDatasource = new AuthDatasourceImpl();
    // const authRepository = new AuthRepositoryImpl(authDatasource);
    // const authMiddleware = new AuthMiddleware(authRepository);

    router.post("/", controller.create).get("/", controller.getAll);

    router.get("/:id", controller.getById);
    // router.post('/', [authMiddleware.validateJWT], controller.create);
    router.put("/:id", controller.update);
    router.delete("/:id", controller.delete);

    // rest of operations
    // ...

    return router;
  }
}
