export const PRODUCTION = process.env.NODE_ENV === 'PRODUCTION'
export const GOODREADS_KEY = process.env.GOODREADS_KEY
export const GOODREADS_SECRET = process.env.GOODREADS_SECRET
export const CLOUDANT_ACCOUNT = process.env.CLOUDANT_ACCOUNT
export const CLOUDANT_KEY = process.env.CLOUDANT_KEY
export const CLOUDANT_PASSWORD = process.env.CLOUDANT_PASSWORD
export const CLOUDANT_DB = process.env.CLOUDANT_DB
export const CLOUDANT_URL = `https://${CLOUDANT_KEY}:${CLOUDANT_PASSWORD}@${CLOUDANT_ACCOUNT}.cloudant.com`
