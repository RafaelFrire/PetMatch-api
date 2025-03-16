import authRouter from "../modules/auth/auth.routes"
import blogRouter from "../modules/blog/blog.routes"
import eventRouter from "../modules/events/event.routes"
import filesRouter from "../modules/files/files.routes";

export default[
    authRouter,
    blogRouter,
    eventRouter,
    filesRouter
]