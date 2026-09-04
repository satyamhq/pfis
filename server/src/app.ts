import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import fs from 'fs';
import rateLimit from 'express-rate-limit';
import routes from './routes/index.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import { config } from './config/env.js';

export const createApp = (): Express => {
  const app = express();

  // Security Headers
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    })
  );

  // CORS Configuration - Permissive for seamless cross-origin and local network access
  app.use(
    cors({
      origin: true,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    })
  );

  // Request Rate Limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // Limit each IP to 1000 requests per window
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      message: 'Too many requests created from this IP, please try again after 15 minutes.',
    },
  });
  app.use('/api', limiter);

  // Logging
  if (config.nodeEnv !== 'test') {
    app.use(morgan('dev'));
  }

  // Body Parsing
  app.use(express.json({ limit: '15mb' }));
  app.use(express.urlencoded({ extended: true, limit: '15mb' }));

  // Static uploads directory for document previews
  const serverUploadDir = path.resolve(process.cwd(), 'server', 'uploads');
  const localUploadDir = path.resolve(process.cwd(), 'uploads');
  const uploadsPath = fs.existsSync(serverUploadDir)
    ? serverUploadDir
    : fs.existsSync(path.resolve(process.cwd(), 'server'))
    ? serverUploadDir
    : localUploadDir;
  app.use('/uploads', express.static(uploadsPath));

  // System Health Endpoint
  app.get('/api/health', (req: Request, res: Response) => {
    res.status(200).json({
      status: 'healthy',
      system: 'Patient Friction Intelligence System (PFIS)',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      mapMode: config.googleMapsApiKey ? 'Google Maps API Active' : 'Demo Map Engine Active',
    });
  });

  // Mount Application Routes
  app.use('/api', routes);

  // 404 Route Handler
  app.use((req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      message: `API endpoint [${req.method}] ${req.url} does not exist on PFIS server.`,
    });
  });

  // Global Error Handler
  app.use(errorHandler);

  return app;
};
