import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Modal, Table, Button } from 'flowbite-react';
import toast from 'react-hot-toast';

import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';

import {
    get_all_comments,
    delete_comment_by_commentId
} from '../../../apis/comment.api';

const CommentsTab = () => {
    const { currentUser } = useSelector((state) => state.user);

    const [comments, setComments] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [commentIdToDelete, setCommentIdToDelete] = useState('');

    // Lấy ra tất cả comments
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await get_all_comments()

                setComments(response.data.comments);
            } catch (error) {
                console.log(error);
                toast.error(error.response.data.message)
            }
        };
        if (currentUser.isAdmin) {
            fetchComments();
        }
    }, [currentUser._id]);

    // Xóa comment
    const handleDeleteComment = async () => {
        setShowModal(false);
        try {
            const response = await delete_comment_by_commentId(commentIdToDelete)

            setShowModal(false);
            setComments((prev) =>
                prev.filter((comment) => comment._id !== commentIdToDelete)
            );
            toast.success("Comment deleted successfully!")
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
            {currentUser.isAdmin && comments.length > 0 ? (
                <Table hoverable className='shadow-md'>
                    <Table.Head>
                        <Table.HeadCell>Date updated</Table.HeadCell>
                        <Table.HeadCell>Comment content</Table.HeadCell>
                        <Table.HeadCell>Number of likes</Table.HeadCell>
                        <Table.HeadCell>PostId</Table.HeadCell>
                        <Table.HeadCell>UserId</Table.HeadCell>
                        <Table.HeadCell>Delete</Table.HeadCell>
                    </Table.Head>
                    {comments.map((comment) => (
                        <Table.Body className='divide-y' key={comment._id}>
                            <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                <Table.Cell>
                                    {new Date(comment.updatedAt).toLocaleDateString()}
                                </Table.Cell>
                                <Table.Cell>{comment.content}</Table.Cell>
                                <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                                <Table.Cell>{comment.postId}</Table.Cell>
                                <Table.Cell>{comment.userId}</Table.Cell>
                                <Table.Cell>
                                    <span
                                        onClick={() => {
                                            setShowModal(true);
                                            setCommentIdToDelete(comment._id);
                                        }}
                                        className='font-medium text-red-500 hover:underline cursor-pointer'
                                    >
                                        Delete
                                    </span>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    ))}
                </Table>
            ) : (
                <p>You have no comments yet!</p>
            )}
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                popup
                size='md'
            >
                <Modal.Header />
                <Modal.Body>
                    <div className='text-center'>
                        <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
                        <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                            Are you sure you want to delete this comment?
                        </h3>
                        <div className='flex justify-center gap-4'>
                            <Button color='failure' onClick={handleDeleteComment}>
                                Yes, I'm sure
                            </Button>
                            <Button color='gray' onClick={() => setShowModal(false)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default CommentsTab