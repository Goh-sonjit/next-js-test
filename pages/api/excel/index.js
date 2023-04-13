import nc from 'next-connect'
import error from '@/server/utils/error'
import { excel } from '@/server/controller/cartItems'
import { verifyToken } from '@/server/middelware/token'
import upload from '@/server/middelware/ImageUpload'
import { updateImage } from '@/server/controller/REGISTERlOGIN'


const handler = nc({error})
   handler.post(excel)
   handler.patch(upload.single('photo'), verifyToken, updateImage)
export default handler