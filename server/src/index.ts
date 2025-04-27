import express from "express"
import notesRoutes from "./routes/noteRoutes"
import { config } from "dotenv"
import cors from "cors"

config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())


//allow everything
//app.use(cors())
app.use(cors({
  origin: "http://localhost:3000", 
}))


app.use(express.json())

app.use("/api/notes", notesRoutes)

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
