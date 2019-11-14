export const isProd = ():Boolean => process.env.REACT_APP_ENVIRONMENT === 'PROD'
export const idDev = ():Boolean => process.env.REACT_APP_ENVIRONMENT === 'DEV'
