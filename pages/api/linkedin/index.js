import nc from 'next-connect'
import error from '@/server/utils/error'
import { linkdinLogin } from '@/server/controller/REGISTERlOGIN'
import { verifyToken } from '@/server/middelware/token'
import { Profile, getItemid } from '@/server/controller/userdata'
import { latlongdata } from '@/server/controller/product'


const handler = nc({error})
handler.post(linkdinLogin)
handler.get(verifyToken, Profile, getItemid)
handler.patch(latlongdata)
export default handler