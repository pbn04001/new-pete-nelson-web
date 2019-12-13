export const isProd = () => process.env.REACT_APP_ENVIRONMENT === 'PROD'
export const idDev = () => process.env.REACT_APP_ENVIRONMENT === 'DEV'
export const isLocal = () => process.env.REACT_APP_ENVIRONMENT === 'LOCAL'
