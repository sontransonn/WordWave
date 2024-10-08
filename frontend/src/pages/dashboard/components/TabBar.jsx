import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from 'flowbite-react';
import toast from 'react-hot-toast';

import { signoutSuccess } from "../../../redux/slices/userSlice"

import {
    HiUser, HiArrowSmRight,
    HiDocumentText, HiOutlineUserGroup, HiAnnotation, HiChartPie,
} from 'react-icons/hi';

import { logout } from "../../../apis/auth.api"

const TabBar = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const { currentUser } = useSelector((state) => state.user);

    const [tab, setTab] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search]);

    const handleSignout = async () => {
        if (window.confirm("")) {
            try {
                const response = await logout()

                dispatch(signoutSuccess());
                toast.success("Logout successfully!")
                navigate("/login")
            } catch (error) {
                console.log(error);
                toast.error(error.response.data.message)
            }
        }
    };

    return (
        <Sidebar className='w-full md:w-56'>
            <Sidebar.Items>
                <Sidebar.ItemGroup className='flex flex-col gap-1'>
                    {currentUser && currentUser.isAdmin && (
                        <Link to='/dashboard?tab=dash'>
                            <Sidebar.Item
                                active={tab === 'dash' || !tab}
                                icon={HiChartPie}
                                as='div'
                            >
                                Dashboard
                            </Sidebar.Item>
                        </Link>
                    )}
                    <Link to='/dashboard?tab=profile'>
                        <Sidebar.Item
                            active={tab === 'profile'}
                            icon={HiUser}
                            label={currentUser.isAdmin ? 'Admin' : 'User'}
                            labelColor='dark'
                            as='div'
                        >
                            Profile
                        </Sidebar.Item>
                    </Link>
                    {currentUser.isAdmin && (
                        <Link to='/dashboard?tab=posts'>
                            <Sidebar.Item
                                active={tab === 'posts'}
                                icon={HiDocumentText}
                                as='div'
                            >
                                Posts
                            </Sidebar.Item>
                        </Link>
                    )}
                    {currentUser.isAdmin && (
                        <>
                            <Link to='/dashboard?tab=users'>
                                <Sidebar.Item
                                    active={tab === 'users'}
                                    icon={HiOutlineUserGroup}
                                    as='div'
                                >
                                    Users
                                </Sidebar.Item>
                            </Link>
                            <Link to='/dashboard?tab=comments'>
                                <Sidebar.Item
                                    active={tab === 'comments'}
                                    icon={HiAnnotation}
                                    as='div'
                                >
                                    Comments
                                </Sidebar.Item>
                            </Link>
                        </>
                    )}
                    <Sidebar.Item
                        icon={HiArrowSmRight}
                        className='cursor-pointer'
                        onClick={handleSignout}
                    >
                        Logout
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}

export default TabBar