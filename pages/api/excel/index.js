import nc from 'next-connect'
import error from '@/server/utils/error'
import { excel } from '@/server/controller/cartItems'


const handler = nc({error})
   handler.post(excel)
export default handler