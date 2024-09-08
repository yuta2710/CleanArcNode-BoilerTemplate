// import from "express";

import { NextFunction, Request, Response } from "express";

export class CustomMiddlewares {
  public static writeInConsole = (_req: Request, _res: Response, next: NextFunction): void => {
    next();
  }
}
