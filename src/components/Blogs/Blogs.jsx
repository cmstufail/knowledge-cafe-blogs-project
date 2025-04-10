import React, { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const Blogs = ({ handleBookMark, disabledBookMarkButtonIds }) => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch("blogs.json")
            .then(res => res.json())
            .then(data => setBlogs(data));
    }, []);

    return (
        <div>
            <h1>Blogs</h1>
            <table className="table-auto w-full border-collapse border">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border-b-1">কভার</th>
                        <th className="px-4 py-2 border-b-1 ">শিরোনাম</th>
                        <th className="px-4 py-2 border-b-1 ">লেখক</th>
                        <th className="px-4 py-2 border-b-1 ">পড়ার সময়</th>
                        <th className="px-4 py-2 border-b-1">প্রিয়</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {blogs.map((blog) => (
                        <tr key={blog.id}>
                            <td className="px-4 py-2 border-b-1"><img src={blog.cover} alt={blog.title} style={{ width: '50px', height: 'auto' }} /></td>
                            <td className="px-4 py-2 border-b-1">{blog.title}</td>
                            <td className="px-4 py-2 border-b-1">{blog.author}</td>
                            <td className="px-4 py-2 border-b-1">{blog.reading_time}</td>
                            <td className="px-4 py-2 border-b-1">
                                <button
                                    onClick={() => handleBookMark(blog)}
                                    disabled={disabledBookMarkButtonIds.has(blog.id)}
                                    className="focus:outline-none"
                                    style={{cursor: disabledBookMarkButtonIds.has(blog.id) ? "not-allowed" : "pointer"}}
                                >
                                    {disabledBookMarkButtonIds.has(blog.id) ? (
                                        <FaHeart className="text-red-500" />
                                    ) : (
                                        <FaRegHeart />
                                    )}
                                </button>
                            </td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Blogs;