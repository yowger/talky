import "module-alias/register"

import app from "@/app"
import { config } from "@/config/config"

const port = config.port

const server = app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})
