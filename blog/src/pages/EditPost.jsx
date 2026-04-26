import React, {useEffect, useState} from 'react'
import {Container, PostForm} from '../components'
import appwriteService from "../appwrite/config"
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {
    const [post, setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        if(slug){
            appwriteService.getPost(slug).then((post)=>{
                if(post){
                    setPost(post)
                }
            })
        }else{
            navigate('/')
        }
    },[slug,navigate])

  return post ? ( 
    <div className='py-8 sm:py-12 relative z-10 min-h-screen'>
        <Container>
            <div className="mb-8 sm:mb-10 animate-fade-in">
                <h1 className="text-2xl sm:text-3xl font-extrabold gradient-text mb-1.5">
                    Edit Post
                </h1>
                <p className="text-slate-500 text-sm sm:text-base">Update your post content and settings</p>
            </div>
            <PostForm post={post}/>
        </Container>
    </div>
  ) : null
}

export default EditPost