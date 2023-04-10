import nc from 'next-connect'
import error from '@/server/utils/error'
import { goh_testimonials } from '@/server/controller/staticPageControl'

const handler = nc(error)
    handler.get(goh_testimonials)
export default handler