import "module-alias/register"

import app from "@/app"
import { config } from "@/config/config"

const port = config.port

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
})
