import { WebSocketServer } from "ws"
import {prisma} from "@repo/db/client"
const wss = new WebSocketServer({port: Number(process.env.PORT)})

wss.on("connection", (socket) => {
    socket.on("open", () => {
        console.log("Hi there!")
    })

    socket.on("message", async() => {
        const user = await prisma.user.create({
            data: {
                email: Math.random().toString(),
                password: Math.random().toString()
            }
        })

        socket.send(JSON.stringify({
            message: "User Created"!,
            userId: user.id
        }))
    })
})