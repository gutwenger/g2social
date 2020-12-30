import React, { useEffect, useContext } from 'react';
import { useQuery } from "@apollo/client";

import { AuthContext } from "../context/auth";
import PostCard from "../component/PostCard";
import PostForm from "../component/PostForm";
import { FETCH_POSTS_QUERY } from "../util/graphQL";
import { navbarActions } from "../helpers";

const Home = () => {

    useEffect(() => {
        navbarActions().underline();
    })

    const { user } = useContext(AuthContext);
    
    const { 
        loading, 
        data 
    } = useQuery(FETCH_POSTS_QUERY);

    return (
        <div className="container">
            <h1 className="containerH1">Recent Posts</h1>
            <div className="home">
                {user && (
                    <div className="home-comment">
                        <PostForm />
                    </div>
                )}
                {loading
                    ? <h1>Loading posts...</h1>
                    : (
                       data.getPosts && data.getPosts.map(post => (
                            <PostCard 
                                key={post.id}
                                post={post}
                                comment={true}
                            />
                       )) 
                    )
                }
            </div>
        </div>
    )
}

export default Home;