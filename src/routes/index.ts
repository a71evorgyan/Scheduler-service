import { Express } from "express-serve-static-core";
import apiRoutes from "./api";

export default class Routes {
  public static configure(app: Express): void {
    app.use("/api", apiRoutes);
  }
}
