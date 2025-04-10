import React, { useEffect, useState } from 'react';
// import { FaBookmark } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";



const Blog = ({ blog, handleBookMark, handleMarkAsRead, isDisabled, isBookmarked: initialIsBookmarked }) => {
    const [isBookmarkedLocal, setIsBookmarkLocal] = useState(initialIsBookmarked);
    const [isClicked, setIsClicked] = useState(false);

    useEffect(()=>{
        setIsBookmarkLocal(initialIsBookmarked);
        setIsClicked(initialIsBookmarked);
    }, [initialIsBookmarked]);

    const handleBookmarkClick = ()=>{
        if(!isDisabled){
            handleBookMark(blog);
            setIsBookmarkLocal(!isBookmarkedLocal);
            setIsClicked(true);
        }
    }
    
    
    return (
        <div className='m-2'>
            {/* <h1> {blog.author} </h1> */}
            <div className="card bg-base-100 w-96 shadow-sm">
                <figure>
                    <img
                        src={blog.cover}
                        alt="Shoes" />
                </figure>
                <div className="card-body">
                    <div className='author flex items-center justify-around'>
                    <h3>{blog.author}</h3>
                    <img className='w-16' src={blog.author_img} alt="" />

                    <button onClick={handleBookmarkClick} disabled={isDisabled}
                        style={{border: "none", background: "transparent", padding: 0,
                            cursor: isDisabled ? "not-allowed" : "pointer"
                        }} 
                        >
                        {
                            isClicked ? (
                                <FaHeart size={25} color={isDisabled ? "red" : "gray"}/>
                            ): (
                                <CiHeart size={25} color={isDisabled ? "gray" : "black"}/>
                            )
                        }

                            </button>
                    
                    </div>
                    <h2 className="card-title">{blog.title}</h2>
                    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>

                    <div className='flex'>
                    {
                        blog.hashtags.map((hash)=> <p key={hash}>{hash}</p>)
                    }

                    </div>
                    <div className="card-actions justify-end">
                        <button onClick={()=>handleMarkAsRead(blog.reading_time, blog.id)} className="btn btn-primary" >mark as read</button>
                    </div>
                </div>
            </div>
        </div>
        
    );
};

export default Blog;