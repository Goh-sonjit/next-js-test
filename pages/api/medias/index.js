import nc from 'next-connect'
import error from '@/server/utils/error'
import { goh_faqs } from '@/server/controller/staticPageControl'
import { city, SearchData } from '../../../server/controller/mediaController'
const handler = nc(error)
    handler.patch(city)
    handler.post(SearchData)
    handler.get(goh_faqs)
export default handler