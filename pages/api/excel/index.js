import nc from 'next-connect'
import error from '@/server/utils/error'
import { excel } from '@/server/controller/cartItems'
import { mediaData } from '@/server/controller/mediaController'

export const config = {
   api: {
     responseLimit: false,
   },
 }
const handler = nc({error})
   handler.post(excel)
   handler.patch(mediaData)
export default handler