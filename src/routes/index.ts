import authRouter from "../modules/auth/auth.routes"
import blogRouter from "../modules/blog/blog.routes"
import eventRouter from "../modules/events/event.routes"
import petsRouter from "../modules/pets/pets.routes";
import ongRouter from "../modules/ongs/ong.routes";
import filesRouter from "../modules/files/files.routes";

export default[
    authRouter,
    blogRouter,
    eventRouter,
    petsRouter,
    ongRouter,
    filesRouter
]