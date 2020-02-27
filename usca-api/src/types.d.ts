
type Handler = (
    req: import("express").Request,
    res: import("express").Response,
    next: import("express").NextFunction
  ) => Promise<void> | void;
  
  type Route = {
    path: string;
    method: "get" | "post" | "put" | "delete";
    handler: Handler | Handler[];
  };
  