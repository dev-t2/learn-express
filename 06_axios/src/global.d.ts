/* eslint-disable no-unused-vars */

declare module NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    SERVICE_KEY: string;
    END_POINT: string;
  }
}
