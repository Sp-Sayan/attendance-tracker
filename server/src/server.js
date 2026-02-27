import express from "express";
import cors from "cors";
import "dotenv/config";
import authRoutes from "./routes/auth.routes.js";


const port = process.env.PORT || 3000

const app = express();

app.use(cors());
app.use(express.json({
    limit: '10mb'
}));
app.use(express.urlencoded({
    extended: true,
    limit: '10mb'
}))

app.use("/api/auth", authRoutes);


app.listen(port, () => {
    console.log("server is running on port", port);
})