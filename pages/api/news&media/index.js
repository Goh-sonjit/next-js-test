import nc from 'next-connect'
import error from '@/server/utils/error'
import { goh_media_and_news } from '@/server/controller/staticPageControl'


const handler = nc(error)
    handler.get(goh_media_and_news)
export default handler