import nc from 'next-connect'
import error from '@/server/utils/error'
import { ppt } from '@/server/controller/cartItems'
import { state_name } from '@/server/controller/mediaController'
import { goh_testimonials } from '@/server/controller/staticPageControl'


const handler = nc({error})
   handler.post(ppt)
   handler.patch(state_name)
   handler.get(goh_testimonials)
export default handler