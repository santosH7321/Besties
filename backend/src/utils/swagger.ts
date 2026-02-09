const SwaggerConfig = {
    openapi: "3.0.0",
    info: {
        title: "Besties official api",
        description: "All private and public api listed here",
        version: "1.0.0",
        contact: {
            name: "Santosh Kumar",
            email: "santoshkumar23kky@gmail.com"
        }
    },
    servers: [
        {url: process.env.SERVER}
    ]
}

export default SwaggerConfig;