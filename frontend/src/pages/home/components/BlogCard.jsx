import React from 'react'
import { Link } from "react-router-dom";

import { BsCheckLg } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

import { images } from '../../../constants';

const BlogCard = ({ post, className }) => {
    return (
        <div
            className={`rounded-xl overflow-hidden shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] ${className}`}
        >
            <Link to={`/blog`}>
                <img
                    src={images.Post1Image}
                    alt="title"
                    className="w-full object-cover object-center h-auto md:h-52 lg:h-48 xl:h-60"
                />
            </Link>

            <div className="p-5">
                <Link to={`/blog`}>
                    <h2 className="font-roboto font-bold text-xl text-dark-soft md:text-2xl lg:text-[28px]">
                        vsvsv
                    </h2>
                    <p className="text-dark-light mt-3 text-sm md:text-lg">
                        vsavsavs
                    </p>
                </Link>

                <div className="flex justify-between flex-nowrap items-center mt-6">
                    <div className="flex items-center gap-x-2 md:gap-x-2.5">
                        <img
                            src={images.PostProfileImage}
                            alt="post profile"
                            className="w-9 h-9 md:w-10 md:h-10 rounded-full"
                        />

                        <div className="flex flex-col">
                            <h4 className="font-bold italic text-dark-soft text-sm md:text-base">
                                vsvasv
                            </h4>

                            <div className="flex items-center gap-x-2">
                                <span
                                    className={` bg-[#36B37E]
                                         w-fit bg-opacity-20 p-1.5 rounded-full`}
                                >
                                    <AiOutlineClose className="w-1.5 h-1.5 text-red-500" />
                                </span>
                                <span className="italic text-dark-light text-xs md:text-sm">
                                    Verified writer
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default BlogCard