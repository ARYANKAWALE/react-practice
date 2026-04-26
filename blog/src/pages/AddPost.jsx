import React from 'react'
import { Container, PostForm } from '../components'

function AddPost() {
  return (
    <div className="py-8 sm:py-12 relative z-10 min-h-screen m-auto">
        <Container>
            <div className="mb-10 sm:mb-14 max-w-2xl animate-fade-in">
                <h1 className="text-2xl sm:text-3xl font-extrabold gradient-text mb-2 tracking-tight">
                    Create New Post
                </h1>
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                    Craft your story and share it with the world
                </p>
            </div>
            <PostForm/>
        </Container>
    </div>
  )
}

export default AddPost