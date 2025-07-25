import React, { use, useEffect } from 'react'
import service from '../appwrite/config'
import { Link } from 'react-router-dom'


function PostCard({$id,title,featuredImage}) {

  useEffect(()=>{
    console.log("PostCard Props:", {$id, title, featuredImage});
    
  })
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={service.getfilePreview(featuredImage) } alt={title}
                
                 />
            </div>
        </div>
        <h2 
        className='text-xl font-bold'
        >{title}</h2>
    </Link>
  )
}

export default PostCard