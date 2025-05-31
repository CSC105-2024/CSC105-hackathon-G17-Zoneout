import { Hono } from "hono";
import { userRouter } from "./user.route.ts";
const mainRouter = new Hono();

mainRouter.route("/users", userRouter);
export { mainRouter };