import express from 'express';
import {prisma} from "@repo/db/client";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hi there");
})

app.post("/signup", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await prisma.user.create({
        data: {
            email,
            password
        }
    })

    res.status(201).json({
        message: 'User Created',
        id: user.id
    })
})

app.listen(process.env.PORT, () => {
    console.log("App is running on PORT " , process.env.PORT);
})
