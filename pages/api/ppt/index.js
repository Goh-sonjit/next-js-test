import nc from 'next-connect'
import error from '@/server/utils/error'
import { ppt } from '@/server/controller/cartItems'


const handler = nc({error})
   handler.post(ppt)
export default handler