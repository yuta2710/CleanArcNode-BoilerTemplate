import { type Server as ServerHttp, type IncomingMessage, type ServerResponse } from 'http';
import express, {type Router, type Request, type Response, type NextFunction} from "express";
import compression from "compression";
import rateLimit from "express-rate-limit";
import { AppError, HttpCode, ONE_HUNDRED, ONE_THOUSAND, SIXTY } from './core';
import { CustomMiddlewares, ErrorMiddleware } from './features/shared';

interface ServerOptions {
  port: number;
  routes: Router;
  apiPrefix: string;
}

export class Server {
  public readonly app = express();
  private serverListener?: ServerHttp<typeof IncomingMessage, typeof ServerResponse>;
  private readonly port: number;
  private readonly routes: Router;
  private readonly apiPrefix: string;

  constructor(options: ServerOptions) {
    const { port, routes, apiPrefix } = options;
    this.port = port;
    this.routes = routes;
    this.apiPrefix = apiPrefix;
  }

  async start(): Promise<void> {
    // Middleware 
    this.app.use(express.json()); // parse json in request body -- allow raw 
    this.app.use(express.urlencoded({extended: true})); //  allow x-www-form-urlencoded
    this.app.use(compression());

    this.app.use(
      rateLimit({
        max: ONE_HUNDRED,
        windowMs: SIXTY * SIXTY * ONE_THOUSAND,
        message: 'Too many requests from this IP, please try again in 1 hour'
      })
    );

    // Shared middleware
    this.app.use(CustomMiddlewares.writeInConsole);

    // CORS 
    this.app.use((req, res, next) => {
      const allowedOrigin = ['http://localhost:8000'];
      const origin = req.headers.origin;

      if(allowedOrigin.includes(origin!)) {
        res.setHeader('Access-Control-Allow-Origin', origin!);
      }

      // Do not forget to add all the necessary methods and headers to avoid CORS problems
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');
			next();
    })

    // Routes 
    this.app.use(this.apiPrefix, this.routes);

    this.app.get('/', (_req: Request, res: Response) => {
			return res.status(HttpCode.OK).send({
				message: `Welcome to Initial API! \n Endpoints available at http://localhost:${this.port}/`
			});
		});

    // Handle not found routes in /api/v1/* (only if 'Public content folder' is not available)
    this.routes.all('*', (req: Request, _: Response, next: NextFunction): void => {
      next(AppError.notFound(`Can't find ${req.originalUrl} on this server!`));
    });

    this.routes.use(ErrorMiddleware.handleError);

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    })
  }

  close(): void {
    this.serverListener?.close();
  }
}

