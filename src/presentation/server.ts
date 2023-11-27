import express, { Router } from "express";
import path from "path";
import fileUpload from "express-fileupload";

interface Options {
  port: number;
  routes: Router;
  public_path?: string;
}

/**
 * Represents a server that listens for incoming requests and handles them accordingly.
 */
export class Server {
  /**
   * The Express application instance.
   */
  public readonly app = express();

  /**
   * The server listener instance.
   */
  private serverListener?: any;

  /**
   * The port number on which the server listens.
   */
  private readonly port: number;

  /**
   * The public folder path for serving static files.
   */
  private readonly publicPath: string;

  /**
   * The router instance containing the server routes.
   */
  private readonly routes: Router;

  /**
   * Creates a new Server instance.
   * @param options - The options for configuring the server.
   */
  constructor(options: Options) {
    const { port, routes, public_path = "public" } = options;
    this.port = port;
    this.publicPath = public_path;
    this.routes = routes;
  }

  /**
   * Starts the server and begins listening for incoming requests.
   */
  async start() {
    //* Middlewares
    this.app.use(express.json()); // raw
    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded
    this.app.use(
      fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 },
      })
    );
    //* Public Folder
    this.app.use(express.static(this.publicPath));

    //* Routes
    this.app.use(this.routes);

    //* SPA /^\/(?!api).*/  <== Únicamente si no empieza con la palabra api
    this.app.get("*", (req, res) => {
      const indexPath = path.join(
        __dirname + `../../../${this.publicPath}/index.html`
      );
      res.sendFile(indexPath);
    });

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  /**
   * Closes the server and stops listening for incoming requests.
   */
  public close() {
    this.serverListener?.close();
  }
}
