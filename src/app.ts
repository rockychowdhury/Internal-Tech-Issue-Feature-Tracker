import express, { 
    type Application, 
    type Request, 
    type Response 
} from "express"



const app : Application = express();


app.use(express.json());




app.get('/', (req : Request, res: Response) => {
    res.status(200).send({
        message: "Express Server",
        Author : "Rocky Chowdhury"
    })
})

export default app;