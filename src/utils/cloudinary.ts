
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUD_NAME
const CLOUD_PRESET = process.env.NEXT_PUBLIC_CLOUD_PRESET
// console.log(CLOUD_NAME)
// console.log(CLOUD_PRESET)

const cloud_name = "mernstackproject"

const uploadCloudinary = async (file: File) => {
 
    const uploadData = new FormData()

    
    uploadData.append('file',file)
    uploadData.append('cloud_name',CLOUD_NAME!)
    uploadData.append('upload_preset',CLOUD_PRESET!)
    
    try{
        const res =  await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,{
            method:"POST",
            body:uploadData,
        })
        const data = await res.json()
        const url= data.url
        console.log(url)
        return url
    }
    catch(err){
        console.log(err)
    }
}

export default uploadCloudinary