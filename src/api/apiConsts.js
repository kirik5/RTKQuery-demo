const env = process.env
export const SERVER_ADDRESS = env.REACT_APP_SERVER_ADDRESS
export const SERVER_PORT = '8077'
export const SERVER_PATH = SERVER_ADDRESS + ':' + SERVER_PORT
const GOODS = '/goods'
export const GOODS_PATH = SERVER_PATH + GOODS
