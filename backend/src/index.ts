import "module-alias/register"

import app from "@/app"
import env from "@/config/env"

const port = env.PORT

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
})
