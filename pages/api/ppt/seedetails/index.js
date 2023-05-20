import nc from 'next-connect'
import error from '@/server/utils/error'
import { product } from '@/server/controller/product'
import { verifyToken } from '@/server/middelware/token'
import { getuser, refreshToken } from '@/server/controller/REGISTERlOGIN'


const handler = nc(error)
    handler.post(product)
    handler.get(verifyToken, refreshToken, getuser)
export default handler