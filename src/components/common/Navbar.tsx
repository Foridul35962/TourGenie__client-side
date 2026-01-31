"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../asset/logo.png';
import { Menu, X, ChevronRight, LogOut } from 'lucide-react';
import avatar from '../../asset/avatar.png'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { logout } from '@/store/slice/authSlice';
import { toast } from 'react-toastify';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [showMenu, setShowMenu] = useState<boolean>(false)
    const { user } = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch<AppDispatch>()

    const menuOption = [
        { name: 'view plan', path: '/view-plan' },
        { name: 'my plan', path: '/my-plan', protect: true },
        { name: 'contact us', path: '/contact' }
    ];

    const handleLogout = async () => {
        if (window.confirm('Are you want to logged out?')) {
            try {
                await dispatch(logout()).unwrap()
                setShowMenu(false)
                toast.success('User logged out successfully')
            } catch (error: any) {
                toast.error(error.message)
            }
        }
    };

    return (
        <nav className="fixed w-full z-50 top-0 bg-white border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-14">

                    {/* Logo Section */}
                    <div className="shrink-0 flex items-center">
                        <Link href="/" className="flex items-center gap-2">
                            <Image
                                src={logo}
                                alt="Tour Genie Logo"
                                width={40}
                                height={40}
                                className="object-contain"
                            />
                            <span className="text-2xl font-black text-gray-900 tracking-tighter hidden sm:block">
                                TOUR <span className="text-red-600">GENIE</span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu & Action Buttons */}
                    <div className="hidden md:flex items-center gap-6">
                        <div className="flex items-center space-x-6">
                            {menuOption.map((option) => (
                                <Link
                                    key={option.name}
                                    href={option.path}
                                    className={`${option.protect && !user ? 'hidden' : 'inline-block'}  text-gray-600 hover:text-red-600 text-sm font-semibold uppercase tracking-wider transition-all duration-200`}
                                >
                                    {option.name}
                                </Link>
                            ))}
                        </div>

                        <div className="flex items-center gap-4">
                            <Link
                                href="/create-plan"
                                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full text-sm font-bold transition-all shadow-md hover:shadow-red-200 active:scale-95"
                            >
                                Get Started
                            </Link>
                            {
                                user &&
                                <div className="relative">
                                    {/* Avatar Image */}
                                    <Image
                                        src={avatar}
                                        alt="avatar"
                                        width={36}
                                        height={36}
                                        className="cursor-pointer rounded-full border-2 border-transparent hover:border-gray-200 transition-all"
                                        onClick={() => setShowMenu(!showMenu)}
                                    />

                                    {showMenu && (
                                        <>
                                            <div
                                                className="fixed inset-0 z-10"
                                                onClick={() => setShowMenu(false)}
                                            />

                                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 z-20 py-2 overflow-hidden">
                                                {/* User Info Section */}
                                                <div className="px-4 py-3 border-b border-gray-50 mb-1">
                                                    <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider">Welcome</p>
                                                    <p className="text-sm font-bold text-gray-800 truncate">{user?.fullName}</p>
                                                </div>

                                                {/* Logout Button */}
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full cursor-pointer text-red-600 flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-red-50 hover:text-red-600 transition-colors"
                                                >
                                                    <LogOut size={16} />
                                                    <span>Logout</span>
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            }
                        </div>
                    </div>

                    {/* Mobile Controls */}
                    <div className="md:hidden flex items-center gap-3">
                        <Link
                            href="/create-plan"
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-xs font-bold transition-all shadow-md active:scale-95"
                        >
                            Get Started
                        </Link>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 p-1 rounded-md hover:bg-gray-100 transition-colors"
                        >
                            {isOpen ? <X size={26} /> : <Menu size={26} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar/Menu */}
            <div className={`fixed inset-y-0 right-0 w-72 bg-white shadow-2xl transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden z-60`}>
                <div className="p-6 flex flex-col h-full">
                    <div className="flex justify-end mb-8">
                        <button onClick={() => setIsOpen(false)} className="p-2 text-gray-500">
                            <X size={28} />
                        </button>
                    </div>

                    <div className="flex flex-col gap-4 grow">
                        {menuOption.map((option) => (
                            <Link
                                key={option.name}
                                href={option.path}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center justify-between text-gray-800 hover:text-red-600 py-3 text-lg font-bold uppercase tracking-wide border-b border-gray-50"
                            >
                                {option.name}
                                <ChevronRight size={18} className="text-gray-300" />
                            </Link>
                        ))}
                    </div>

                    {/* Logout Button (Mobile) */}
                    <div className="mt-auto">
                        <button
                            onClick={() => { handleLogout(); setIsOpen(false); }}
                            className="w-full flex items-center justify-center gap-3 py-3 text-red-600 font-bold border border-red-100 rounded-xl bg-red-50 hover:bg-red-100 transition-all"
                        >
                            <LogOut size={20} />
                            LOGOUT
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden z-55"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}
        </nav>
    );
};

export default Navbar;