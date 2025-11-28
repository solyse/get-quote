/**
 * Environment configuration
 * Uses environment variables with REACT_APP_ prefix (required by Create React App)
 * Falls back to default values if not set
 */

export interface EnvConfig {
  env: 'production' | 'staging';
  apiBaseUrl: string;
  locUrl: string;
  websiteUrl: string;
  bagcaddieCode: string;
}

// Default configuration (development/staging)
const defaultConfig: EnvConfig = {
  env: 'staging',
  bagcaddieCode: 'BGDLO6F5',
  apiBaseUrl: 'https://fc.vsfy.com/vShip/bc-sandbox',
  websiteUrl: 'https://stg.bagcaddie.com',
  locUrl: 'https://fc.vsfy.com/loc/?bagCaddie2025'
};

// Production configuration
const productionConfig: EnvConfig = {
  env: 'production',
  bagcaddieCode: 'BGDLO6F5',
  apiBaseUrl: 'https://fc.vsfy.com/vShip/fc',
  websiteUrl: 'https://bagcaddie.com',
  locUrl: 'https://fc.vsfy.com/loc/?bagCaddie2025'
};

/**
 * Get environment configuration
 * Checks REACT_APP_ENV to determine which config to use
 * Environment variables override config values if provided
 */
export const getEnvConfig = (): EnvConfig => {
  const envFromProcess = process.env.REACT_APP_ENV;
  console.log('process.env.NODE_ENV', envFromProcess);
  // Debug logging (remove in production if needed)
  if (process.env.NODE_ENV === 'development') {
    console.log('[EnvConfig] REACT_APP_ENV:', envFromProcess);
    console.log('[EnvConfig] All REACT_APP_ vars:', Object.keys(process.env).filter(key => key.startsWith('REACT_APP_')));
  }
  
  // Normalize the environment value (case-insensitive, trim whitespace)
  const normalizedEnv = envFromProcess?.toLowerCase().trim();
  
  // Determine which base config to use
  let baseConfig: EnvConfig;
  if (normalizedEnv === 'production') {
    baseConfig = productionConfig;
    if (process.env.NODE_ENV === 'development') {
      console.log('[EnvConfig] Using PRODUCTION configuration');
    }
  } else {
    baseConfig = defaultConfig;
    if (process.env.NODE_ENV === 'development') {
      console.log('[EnvConfig] Using STAGING configuration (default)');
    }
  }

  // Override with environment variables if provided
  const config: EnvConfig = {
    env: (normalizedEnv === 'production' ? 'production' : 'staging') as EnvConfig['env'],
    apiBaseUrl: process.env.REACT_APP_API_BASE_URL || baseConfig.apiBaseUrl,
    locUrl: process.env.REACT_APP_LOC_URL || baseConfig.locUrl,
    websiteUrl: process.env.REACT_APP_WEBSITE_URL || baseConfig.websiteUrl,
    bagcaddieCode: process.env.REACT_APP_BAGCADDIE_CODE || baseConfig.bagcaddieCode
  };

  if (process.env.NODE_ENV === 'development') {
    console.log('[EnvConfig] Final config:', config);
  }

  return config;
};

// Export the configuration instance
export const envConfig = getEnvConfig();

