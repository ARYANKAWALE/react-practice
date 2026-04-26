import React, { useEffect, useState } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config"

function AllPost() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) setPosts(posts.documents)
        })
    }, [])
    return (
        <div className="py-8 sm:py-12 relative z-10 min-h-screen">
            <Container>
                <div className="mb-8 sm:mb-10 animate-fade-in">
                    <h1 className="text-2xl sm:text-3xl font-extrabold gradient-text mb-1.5">All Posts</h1>
                    <p className="text-slate-500 text-sm sm:text-base">Browse every post in the collection</p>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 animate-fade-in-delay'>
                    {posts.map((post) => <PostCard key={post.$id} {...post} />)}
                </div>
            </Container>
        </div>
    )
}

export default AllPost