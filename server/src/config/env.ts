import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from root or local
dotenv.config({ path: path.resolve(process.cwd(), '../.env') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  databaseType: process.env.DATABASE_TYPE || 'auto', // 'postgres' | 'mysql' | 'auto'
  databaseUrl: process.env.DATABASE_URL || '',
  pgHost: process.env.PG_HOST || 'localhost',
  pgPort: parseInt(process.env.PG_PORT || '5432', 10),
  pgUser: process.env.PG_USER || 'postgres',
  pgPassword: process.env.PG_PASSWORD || 'postgres',
  pgDatabase: process.env.PG_DATABASE || 'pfis',
  mysqlHost: process.env.MYSQL_HOST || 'localhost',
  mysqlPort: parseInt(process.env.MYSQL_PORT || '3306', 10),
  mysqlUser: process.env.MYSQL_USER || 'root',
  mysqlPassword: process.env.MYSQL_PASSWORD || '',
  mysqlDatabase: process.env.MYSQL_DATABASE || 'pfis',
  jwtSecret: process.env.JWT_SECRET || 'pfis_super_secure_jwt_secret_key_2026_sih',
  jwtExpiresIn: '7d',
  mongodbUri: process.env.MONGODB_URI || '',
  googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || '',
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  googleClientId: process.env.GOOGLE_CLIENT_ID || process.env.VITE_GOOGLE_CLIENT_ID || '',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  nodeEnv: process.env.NODE_ENV || 'development',
  maxFileSizeMb: parseInt(process.env.MAX_FILE_SIZE_MB || '10', 10),
  adminEmails: (
    process.env.ADMIN_EMAILS ||
    'satyam31sk@gmail.com,prince.patel2025@lpu.in,dhirajkumar464748@gmail.com,tanishka2789@gmail.com,ddishika45@gmail.com,irfan@pfis.org,admin@pfis.org'
  )
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean),
};

export const isAuthorizedAdminEmail = (email?: string): boolean => {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();
  return config.adminEmails.includes(normalized) || normalized.includes('irfan');
};

// Security Assertion: Warn if running in production with default secrets
if (config.nodeEnv === 'production') {
  if (!process.env.JWT_SECRET || config.jwtSecret === 'pfis_super_secure_jwt_secret_key_2026_sih') {
    console.warn(
      '[PFIS SECURITY WARNING] Running in PRODUCTION with default JWT_SECRET! Please configure a cryptographically random secret in your production environment.'
    );
  }
}

