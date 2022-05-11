import swaggerJsDoc from "swagger-jsdoc";

export const swaggerFunction = () => {
    const options = {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Coach app",
                version: '1.0.0',
                description: "Api reference"
            },
            servers:[
                {
                    url: "http://localhost:3000" 
                },
                {
                    url: "http://coachdevapi.appskeeper.in"
                }
            ]
        },
        apis: [process.cwd() + "/src/routes/v1/*.ts"]
    }
    const specs = swaggerJsDoc(options);
    return specs;
}