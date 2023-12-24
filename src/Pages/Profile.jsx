import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { useDispatch } from 'react-redux';
import { app } from '../firebase';



function Profile() {
  const fileRef = useRef(null);
  const { createUser, loading, error } = useSelector((state) => state);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();
  console.log(file)

    
   useEffect(() => {
   if(file){
    handleFileUpload(file)
   }
   }, [file])

   const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
        console.log(progress)
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
   
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Profile</h1>
      <form className='flex flex-col gap-4 self-center'>
        <input type='file' hidden ref={fileRef} onChange={(e)=>setFile(e.target.files[0])}/>
        <img onClick={()=>fileRef.current.click()} src={formData.avatar || createUser.avatar} alt='profile'
        className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'/>
                <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
        <input type='text' placeholder='username' onChange={handleChange}
        className='border p-3 rounded-lg'/>
        <input type='text' placeholder='email' onChange={handleChange}
        className='border p-3 rounded-lg'/>
        <input type='text' placeholder='password' onChange={handleChange}
        className='border p-3 rounded-lg'/>
        <button className='bg-slate-800 p-3 text-center rounded-lg uppercase text-white'>update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
    </div>
  )
}

export default Profile
