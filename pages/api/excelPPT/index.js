import nc from 'next-connect'
import error from '@/server/utils/error'
import { excelPPT } from '@/server/controller/cartItems'


const handler = nc({error})
   handler.post(excelPPT)
export default handler