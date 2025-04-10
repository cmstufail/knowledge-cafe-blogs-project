import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Blogs from './components/Blogs/Blogs';
import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [bookmarked, setBookmarked] = useState([]);
    const [disabledBookMarkButtonIds, setDisabledBookMarkButtonIds] = useState(new Set());
    const [totalReadingTime, setTotalReadingTime] = useState(0);
    const [selectedImageId, setSelectedImageId] = useState(null);

    const isBlogBookmarked = (blogId) => {
        return bookmarked.some(bookmarkedBlog => bookmarkedBlog.id === blogId);
    };

    const handleBookMark = (blog) => {
        const isAlreadyBookmarked = bookmarked.some(item => item.id === blog.id);
        if (!isAlreadyBookmarked) {
            setBookmarked([...bookmarked, blog]);
            setDisabledBookMarkButtonIds(new Set(disabledBookMarkButtonIds).add(blog.id));
            setSelectedImageId(blog.id);
            setTotalReadingTime(prevTotal => prevTotal + blog.reading_time);
            toast.info(` Item Added to your Favorite Lists`);
        } else {
            toast.info;
        }
    };

    const handleMarkAsRead = (time, id) => {
        handleRemoveFromBookmark(id);
    };

    const handleRemoveFromBookmark = (id) => {
        const removedBlog = bookmarked.find(blog => blog.id === id);
        if (removedBlog) {
            setTotalReadingTime(prevTotal => prevTotal - removedBlog.reading_time);
        }
        const remainingBookMark = bookmarked.filter((mark) => mark.id !== id);
        setBookmarked(remainingBookMark);
        const updateDisabledIds = new Set(disabledBookMarkButtonIds);
        updateDisabledIds.delete(id);
        setDisabledBookMarkButtonIds(updateDisabledIds);
    };

    const handleDeleteImage = (id) => {
        const removedBlog = bookmarked.find(blog => blog.id === id);
        if (removedBlog) {
            setTotalReadingTime(prevTotal => prevTotal - removedBlog.reading_time);
        }
        const updateBookmarks = bookmarked.filter((item) => item.id !== id);
        setBookmarked(updateBookmarks);
        const updateDisabledIds = new Set(disabledBookMarkButtonIds);
        updateDisabledIds.delete(id);
        setDisabledBookMarkButtonIds(updateDisabledIds);
        toast.error('Item Remove From Favorites!');
    };
    const truncateTitle = (title) => {
        const words = title.split(' ');
        if (words.length > 3) {
            return words.slice(0, 3).join(' ') + '...';
        }
        return title;
    };

    return (
        <>
            <Navbar />
            <main className='main-container flex text-center gap-14'>
                <div className="left-container w-[70%]">
                    <Blogs
                        handleBookMark={handleBookMark}
                        handleMarkAsRead={handleMarkAsRead}
                        disabledBookMarkButtonIds={disabledBookMarkButtonIds}
                        selectedImageId={selectedImageId}
                        isBlogBookmarked={isBlogBookmarked}
                    />
                </div>
                <div className="right-container w-[25%] bg-gray-300 rounded-lg">
                    {
                        bookmarked.length === 0 ? (
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <span style={{ display: 'block', width: '95%', borderBottom: '2px solid black', marginBottom: '8px', marginTop: "20px" }}></span>
                                <h2 style={{ display: "flex", gap: "100px", fontSize: "20px", font: "bold", paddingTop: "30px" }}>No Favorites Yet</h2>
                                <p style={{ paddingBottom: "10px", paddingTop: "5px" }}>Click the heart icon on any item to add it to your favorites</p>

                                <span style={{ display: 'block', width: '95%', borderBottom: '2px solid black', marginTop: '8px', marginBottom: "8px" }}></span>

                                <h3 style={{ display: "flex", gap: "100px", fontSize: "20px", font: "bold" }}> <p>Total Bids Amount:</p> <p>$0</p> </h3>
                            </div>
                        ) : (
                            <>

                            </>
                        )
                    }
                    
                    
                    {bookmarked.map((marked, index) => (
                        <div key={marked.id}

                            className="my-4 bg-gray-200 p-3 rounded-lg">
                            <div className="">
                                {index === 0 && (
                                    <span style={{ display: 'block', width: '100%', borderBottom: '2px solid black', marginBottom: '8px' }}></span>
                                )}
                                <div className='flex justify-between items-center w-[350px] border rounded-lg'>
                                    <div><img className="w-16 h-16 border p-1 rounded-lg bg-white ml-1" src={marked.cover} alt="" /></div>
                                    <div className='flex flex-col items-center'>
                                        <span>{truncateTitle(marked.title)} </span>
                                        <span>${marked.reading_time}</span>
                                        <span>${marked.reading_time}</span>
                                    </div>

                                    <div>
                                        <button
                                            onClick={() => handleDeleteImage(marked.id)}
                                            className=" rounded-full w-7 h-7  items-center justify-center text-xl pointer hover:bg-red-400"
                                            style={{ cursor: "pointer" }}
                                        >
                                            X
                                        </button>
                                    </div>
                                </div>
                                {index === bookmarked.length - 1 && (

                                    <>
                                        <span style={{ display: 'block', width: '100%', borderBottom: '2px solid black', marginTop: '8px' }}></span>
                                        <p className="flex justify-around text-base"><span>Total Bids Amount:</span> <span>${totalReadingTime}.00</span></p>
                                    </>

                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </>
    );
}

export default App;