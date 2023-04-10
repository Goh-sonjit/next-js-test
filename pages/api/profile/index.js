import nc from 'next-connect'
import error from '@/server/utils/error'
import { verifyToken } from '@/server/middelware/token'
import { changePassword } from '@/server/controller/otp'
import { allcompanyData } from '@/server/controller/userdata'
import { companyDetails, updateProfile } from '@/server/controller/REGISTERlOGIN'
import upload from '@/server/middelware/ImageUpload'



const handler = nc(error)
handler.put(verifyToken, changePassword)
handler.get(verifyToken, allcompanyData)
handler.patch(verifyToken, companyDetails)
handler.post(verifyToken,upload.single("photo"), updateProfile)
export default handler