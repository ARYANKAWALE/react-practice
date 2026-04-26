import React from 'react'
import { Container, PostForm } from '../components'

function AddPost() {
  return (
    <div className='py-8 sm:py-12 relative z-10 min-h-screen'>
        <Container>
            <div className="mb-8 sm:mb-10 animate-fade-in">
                <h1 className="text-2xl sm:text-3xl font-extrabold gradient-text mb-1.5">
                    Create New Post
                </h1>
                <p className="text-slate-500 text-sm sm:text-base">Craft your story and share it with the world</p>
            </div>
            <PostForm/>
        </Container>
    </div>
  )
}

export default AddPost