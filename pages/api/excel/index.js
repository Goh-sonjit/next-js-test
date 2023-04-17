import nc from 'next-connect'
import error from '@/server/utils/error'
import { excel } from '@/server/controller/cartItems'
import { verifyToken } from '@/server/middelware/token'

import { updateImage } from '@/server/controller/REGISTERlOGIN'


const handler = nc({error})
   handler.post(excel)
export default handler