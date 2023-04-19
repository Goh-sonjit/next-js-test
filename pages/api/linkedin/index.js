import nc from 'next-connect'
import error from '@/server/utils/error'
import { changePassword, linkdinLogin } from '@/server/controller/REGISTERlOGIN'
import { verifyToken } from '@/server/middelware/token'
import { Profile, getItemid } from '@/server/controller/userdata'


const handler = nc({error})
handler.post(linkdinLogin)
handler.get(verifyToken, Profile, getItemid)
handler.put(verifyToken, changePassword  )
export default handler