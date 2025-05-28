'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    UserCircleIcon,
    DocumentTextIcon,
    ChartBarIcon,
    DocumentReportIcon,
    ChatAlt2Icon,
} from '@heroicons/react/outline';
import NavBarModerator from '../NavBar';

export default function Dashboard() {
    const router = useRouter();
    const [userName, setUserName] = useState('User');

    useEffect(() => {
        setUserName('Admin');
    }, []);

    const handleNavigation = (path: string) => {
        router.push(path);
    };

    return (
        <div className="pt-24 min-h-screen bg-gray-900 text-gray-100 font-poppins">
            {/* Header */}
            <NavBarModerator/>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
                <div className="px-4 sm:px-0">
                    {/* Gestión */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold mb-4">Management Tools</h2>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            <button
                                onClick={() => handleNavigation('/moderator/management/users')}
                                className="flex flex-col items-center p-6 bg-gray-800 rounded-lg shadow-md hover:bg-indigo-600 transition duration-300"
                            >
                                <UserCircleIcon className="h-10 w-10 text-[#00DBE3] mb-3" />
                                <span className="text-lg font-semibold">Manage Users</span>
                                <span className="text-sm text-gray-400">View and edit user profiles</span>
                            </button>

                            <button
                                onClick={() => handleNavigation('/moderator/management/contents')}
                                className="flex flex-col items-center p-6 bg-gray-800 rounded-lg shadow-md hover:bg-indigo-600 transition duration-300"
                            >
                                <DocumentTextIcon className="h-10 w-10 text-[#00DBE3] mb-3" />
                                <span className="text-lg font-semibold">Manage Content</span>
                                <span className="text-sm text-gray-400">Edit and publish content</span>
                            </button>

                            <button
                                onClick={() => handleNavigation('/moderator/management/graph')}
                                className="flex flex-col items-center p-6 bg-gray-800 rounded-lg shadow-md hover:bg-indigo-600 transition duration-300"
                            >
                                <ChartBarIcon className="h-10 w-10 text-[#00DBE3] mb-3" />
                                <span className="text-lg font-semibold">View Graph</span>
                                <span className="text-sm text-gray-400">Visualize student relationships</span>
                            </button>
                            <button
                                onClick={() => handleNavigation('/moderator/management/helpRequests')}
                                className="flex flex-col items-center p-6 bg-gray-800 rounded-lg shadow-md hover:bg-indigo-600 transition duration-300"
                            >
                                <ChatAlt2Icon className="h-10 w-10 text-[#00DBE3] mb-3" />
                                <span className="text-lg font-semibold">View Help Requests</span>
                                <span className="text-sm text-gray-400">Answer student requests</span>
                            </button>
                        </div>
                    </div>

                    {/* Reportes */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Reports</h2>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {[
                                { label: 'Most valued content.', path: '/moderator/reports/MostValuedContents' },
                                { label: 'Students with more help requests', path: '/moderator/reports/MostHelpRequests' },
                            ].map((report, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleNavigation(report.path)}
                                    className="flex flex-col items-center p-6 bg-gray-800 rounded-lg shadow-md hover:bg-indigo-600 transition duration-300"
                                >
                                    <DocumentReportIcon className="h-10 w-10 text-indigo-400 mb-3" />
                                    <span className="text-lg font-semibold">{report.label}</span>
                                    <span className="text-sm text-gray-400">View report</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 mt-12">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-gray-400">
                        &copy; {new Date().getFullYear()} MindLink. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
