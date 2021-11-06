/* eslint-disable no-unused-vars */

declare module NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
  }
}
