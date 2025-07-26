import React, { useEffect, useState } from 'react'
import service from '../appwrite/config'
import { PostCard,Container } from '../components'

function Home() {
    const [posts, setPosts] = useState([])
    useEffect(()=>{
        service.getPosts([])?.then((posts)=>{
            if(posts){
                setPosts(posts.documents)
            }
        })
    },[])
    if(posts.length ===0){
        return (
            <div className='w-full py-8'>
                <Container>
                    <h1 className='text-2xl font-bold'>No posts available</h1>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post)=>(
                        <div key={post.$id} className='p-2 w-1/4' >
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>   
        </div>
    )
}

export default Home