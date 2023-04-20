import nc from 'next-connect'
import error from '@/server/utils/error'
import { changepasswoed, linkdinLogin } from '@/server/controller/REGISTERlOGIN'
import { verifyToken } from '@/server/middelware/token'
import { Profile, getItemid } from '@/server/controller/userdata'


const handler = nc({error})
handler.post(linkdinLogin)
handler.get(verifyToken, Profile, getItemid)
handler.put(verifyToken, changepasswoed)
export default handler