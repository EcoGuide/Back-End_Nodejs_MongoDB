import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUIExpress from 'swagger-ui-express';

const options = {
  swaggerDefinition: {
    info: {
      title: 'Nom de votre API',
      version: '1.0.0',
      description: 'Description de votre API',
    },
  },
  apis: ['./routes/authRoutes.js'], // Spécifiez le chemin vers vos fichiers API ici
};

const swaggerSpec = swaggerJSDoc(options);


export const serveSwaggerUI = swaggerUIExpress.serve;
export const setupSwaggerUI = swaggerUIExpress.setup(swaggerSpec);

