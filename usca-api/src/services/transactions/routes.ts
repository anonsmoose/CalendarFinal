import { Request, Response } from "express";

export default [
  {
    path: "/transactions/",
    method: "get",
    handler: async (req: Request, res: Response) => {
      res.send("Hello world!");
    }
  }
] as Route[];