import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import service from '../appwrite/config'
import { Container,PostForm } from '../components'
import { set } from 'react-hook-form'


function EditPost() {
    const [post, setPost] = useState(null)
    const navigate = useNavigate();
    const {slug}=useParams();
    useEffect(() => {
        if(slug){
            service.getPost(slug)?.then((post)=>{
                if(post){
                    setPost(post)
                }
            })
        }else{
            navigate('/')
        }
    },[slug,navigate])
    return post?(
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ):null
}

export default EditPost