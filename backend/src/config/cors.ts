import cors from "cors"

function createCorsOptions(origins: string[]): cors.CorsOptions {
    return {
        origin: (origin, callback) => {
            if (origins.includes(origin) || !origin) {
                callback(null, true)
            } else {
                const errorMessage = `Origin '${origin}' not allowed by CORS`

                callback(new Error(errorMessage))
            }
        },
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
        optionsSuccessStatus: 204,
    }
}

export default createCorsOptions
