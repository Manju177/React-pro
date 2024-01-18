import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useState } from 'react'
import { app } from '../firebase'
import { useSelector } from 'react-redux'
import { toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


function CreateListing() {
    const [files, setFiles] = useState([])
    const {createUser}=useSelector((state)=>state)
    console.log('createUser',createUser._id)
    const [formData, setFormData] = useState({
        imageUrls: [],
        name:'',
        description:'',
        address:'',
        type:'rent',
        bedrooms:1,
        bathrooms:1,
        regularPrice:0,
        discountPrice:0,
        offer:false,
        parking:false,
        furnished:false,
    })
    const [uploadError, setUploadError] = useState(false)
    const [error,setError]=useState(false)
    const [uploadProgress, setUploadProgress] = useState("")
    const [loading,setLoading]=useState(false)
    const [uploading,setupLoading]=useState(false)
    console.log(files.length)

    const handleUpload = (e) => {
        if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
            setupLoading(true)
            setUploadError(false)
            const promises = []
            for (let i = 0; i < files.length; i++) {
                promises.push(setImages(files[i]))
            }
            Promise.all(promises)
                .then((urls) => {
                    console.log('urls:', urls)
                    setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) });
                    setUploadError(false)
                    setupLoading(false)
                }).catch((err) => {
                    console.log('err', err)
                    setUploadError("Image Upload Failed (2 mb max per Image)");
                    setupLoading(false)
                });

        }
        else {
            setUploadError("You can Upload 6 images per listing")
        }
    }

    const handleDleteImage=(index)=>{
        setFormData({...formData,
            imageUrls:formData.imageUrls.filter((_,i)=>i!==index)
        })
    }

    const setImages = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName)
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "stage _changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`);
                    setUploadProgress(Math.round(progress))
                },
                (error) => {
                    reject(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL)
                    });
                }
            )
        })
    }

    const handleSumbit=async(e)=>{
        e.preventDefault();
        try {
            setLoading(true)
            setError(false)
            const res=await fetch('api/listing/create',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({...formData,
                    userRef:createUser._id}),
            });
            const data=await res.json();

            setLoading(false)
            if(data.success===false){
                setError(data.message)
            }
        toast.success("Listing is Completed Successfully!", {
        position: toast.POSITION.TOP_CENTER
      });
        } catch (error) {
            setError(error.message)
            setLoading(false)
        }
    }

    const handleChange=(e)=>{
        if(e.target.id==='sale' || e.target.id==='rent'){
            setFormData({
                ...formData,
                type:e.target.id
            })
        }
        if(e.target.id==='parking' || e.target.id==='furnished' || e.target.id==='offer'){
            setFormData({
                ...formData,
                [e.target.id]:e.target.checked
            })
        }
       if(e.target.type==='number' || e.target.type==='text' || e.target.type==='textarea'){
        setFormData({
            ...formData,
            [e.target.id]:e.target.value
        })
       } 

    }

    console.log('formData',formData)
    return (
        <main className='p-3 max-w-4xl mx-auto'>
            <h1 className='text-center my-7 text-2xl font-semibold underline'>Create a Listing</h1>
            <div className='flex gap-4 flex-row'>
                <form onSubmit={handleSumbit} className='flex flex-col gap-4 sm:flex-row'>
                    <div className='flex flex-col gap-4 flex-1'>
                        <input type='text' onChange={handleChange} value={formData.name}  placeholder='Name' className='border  p-3 rounded-lg' id='name' maxLength='62' minLength='10' required />
                        <textarea type='text' onChange={handleChange} value={formData.description} placeholder='Description' className='border  p-3 rounded-lg' id='description' maxLength='62' minLength='10' required />
                        <input type='text' onChange={handleChange} value={formData.address} placeholder='Address' className='border  p-3 rounded-lg' id='address' maxLength='62' minLength='10' required />
                        <div className='flex gap-4 flex-wrap'>
                            <div className='flex gap-2'>
                                <input type='checkbox' id='sale' className='w-5' onChange={handleChange} checked={formData.type==='sale'} />
                                <span>Sell</span>
                            </div>
                            <div className='flex gap-2'>
                                <input type='checkbox' id='rent' className='w-5' onChange={handleChange} checked={formData.type==='rent'}  />
                                <span>Rent</span>
                            </div>
                            <div className='flex gap-2'>
                                <input type='checkbox' id='parking' className='w-5' onChange={handleChange} checked={formData.parking} />
                                <span>Parking spot</span>
                            </div>
                            <div className='flex gap-2'>
                                <input type='checkbox' id='furnished' className='w-5' onChange={handleChange} checked={formData.furnished} />
                                <span>Furnished</span>
                            </div>
                            <div className='flex gap-2'>
                                <input type='checkbox' id='offer' className='w-5' onChange={handleChange} checked={formData.offer} />
                                <span>Offer</span>
                            </div>
                        </div>
                        <div className='flex flex-wrap gap-6'>
                            <div className='flex items-center gap-2'>
                                <input type='number' id='bedrooms' min='1' max='10' required
                                    className='p-3 border border-gray-300 rounded-lg' onChange={handleChange} checked={formData.bedrooms}  />
                                <p>Beds</p>
                            </div>
                            <div className='flex items-center gap-2'>
                                <input type='number' id='bathrooms' min='1' max='10' required
                                    className='p-3 border border-gray-300 rounded-lg' onChange={handleChange} checked={formData.bathrooms }  />
                                <p>Baths</p>
                            </div>
                            <div className='flex items-center gap-2'>
                                <input type='number' id='regularPrice' min='1' max='1000000' required
                                    className='p-3 border border-gray-300 rounded-lg' onChange={handleChange} checked={formData.regularPrice }  />
                                <p>Regular Price</p>
                                <span>(₹/month)</span>
                            </div>
                            {formData.offer &&
                            <div className='flex items-center gap-2'>
                                <input type='number' id='discountPrice' min='1' max='10000' required
                                    className='p-3 border border-gray-300 rounded-lg' onChange={handleChange} checked={formData.discountPrice}  />
                                <p>Discounted Price</p>
                                <span>(₹/month)</span>
                            </div>}
                        </div>
                    </div>
                    <div className='flex flex-col gap-4 flex-1'>
                        <p className='font-semibold'>Images:
                            <span className='font-normal text-gray-700 ml-2'>The first image will be the cover (max 6)</span>
                        </p>
                        <div className='flex flex-col gap-4'>
                            <input onChange={(e) => setFiles(e.target.files)} className='p-3 border border-gray-300 rounded w-full' type='file' id='images' accept='image/*'
                                multiple />
                            <p className='text-red-600' >{uploadError ? uploadError : ""}</p>
                            {
                                formData.imageUrls.length > 0 && formData.imageUrls.map((url,i) => {
                                    return (
                                        <div className='flex justify-between p-3 items-center border'>
                                            <img src={url} alt='listing image' className='w-40 h-30 object-cover rounded-lg' />
                                            <button onClick={()=>handleDleteImage(i)} className='p-3 rounded-lg uppercase hover:opacity-75 text-red-900 '>Delete</button>
                                        </div>
                                    )
                                })
                            }
                            <button type='button' onClick={handleUpload} disabled={uploading} className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>{uploading?"Uploading...":"Upload"}</button>
                            <button disabled={uploading } onClick={handleSumbit} className='p-3 text-yellow-100 bg-slate-950 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'> {loading?"Creating...":"Create Listing"}</button>
                            {error && <p className='text-red-700 text-sm'>{error}</p>}
                        </div>
                    </div>

                </form>
            </div>
        </main>
    )
}

export default CreateListing