import nc from 'next-connect'
import error from '@/server/utils/error'
import { excel } from '@/server/controller/cartItems'
import { getCityData, mediaData } from '@/server/controller/mediaController'

export const config = {
   api: {
     responseLimit: false,
   },
 }
const handler = nc({error})
   handler.post(excel)
   handler.patch(mediaData)
   handler.put(getCityData)
export default handler