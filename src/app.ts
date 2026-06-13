import express, { 
    type Application, 
    type Request, 
    type Response 
} from "express";
import { authRoute } from "./modules/auth/auth.route";
import { issueRoute } from "./modules/issue/issue.route";
import { globalErrorHandler } from "./middleware/globalErrorHandler";



const app : Application = express();

// app.use(CookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// app.use(cors(
//     {
//         origin: ""
//     }
// ));




app.get('/', (req : Request, res: Response) => {
    res.status(200).send({
        message: "Express Server",
        Author : "Rocky Chowdhury"
    })
})

app.use("/api/auth",authRoute);
app.use("/api/issues",issueRoute);


app.use(globalErrorHandler);


export default app;