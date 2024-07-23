import React from 'react'
import { Link } from "react-router-dom";

import { FaArrowRight } from "react-icons/fa";

import BlogCard from './BlogCard';

const Blogs = () => {
    return (
        <section className="flex flex-col container mx-auto px-5 py-10">
            <div className=" flex flex-wrap md:gap-x-5 gap-y-5 pb-10">
                <BlogCard className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]" />
                <BlogCard className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]" />
                <BlogCard className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]" />
                <BlogCard className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]" />
                <BlogCard className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]" />
                <BlogCard className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]" />
                <BlogCard className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]" />
                <BlogCard className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]" />
            </div>

            <Link
                to="/blog"
                className="mx-auto flex items-center gap-x-2 font-bold text-primary border-2 border-primary px-6 py-3 rounded-lg"
            >
                <span>More articles</span>
                <FaArrowRight className="w-3 h-3" />
            </Link>
        </section>
    )
}

export default Blogs