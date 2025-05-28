'use client'

import React, { useEffect, useState } from 'react';
import { Content } from '@/types/Content';
import api from '@/lib/api';
import ContentCard from '@/components/ContentComponents/ContentCard';
import NavBarModerator from '../../NavBar';
import { Trophy } from 'phosphor-react';

export default function MostValuedContents() {
    const [contents, setContents] = useState<Content[]>([]);

    useEffect(() => {
        const fetchHighValuedContents = async () => {
            const response = await api.get<Content[]>('/contents/highValorations');
            setContents(response.data);
        };
        fetchHighValuedContents();
    }, []);

    return (
        <div className="p-24 min-h-screen bg-gray-900 text-gray-100 font-poppins">
    <NavBarModerator />
    <div className="container mx-auto py-8">
        <div className='flex'>
        <h1 className="text-3xl font-bold text-center mb-20 mr-4">Top Valued Contents</h1>
        <Trophy size={30}/>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-end gap-4 md:gap-8">
            {/* Second Place */}
            {contents[1] && (
                <div className="flex justify-center items-center transform translate-y-8">
                    <div className="p-4 rounded-lg shadow-lg max-w-sm w-full">
                        <div className="text-center bg-silver-500 text-white py-2 rounded-t-lg">
                            <span className="text-xl font-semibold">2nd Place 🥈</span>
                        </div>
                        <ContentCard content={contents[1]} />
                    </div>
                </div>
            )}

            {/* First Place */}
            {contents[0] && (
                <div className="flex justify-center items-center transform scale-110 -translate-y-4">
                    <div className="p-4 rounded-lg shadow-xl max-w-sm w-full">
                        <div className="text-center bg-gold-500 text-white py-2 rounded-t-lg">
                            <span className="text-2xl font-bold">1st Place 🏆</span>
                        </div>
                        <ContentCard content={contents[0]} />
                    </div>
                </div>
            )}

            {/* Third Place */}
            {contents[2] && (
                <div className="flex justify-center items-center transform translate-y-12">
                    <div className="p-4 rounded-lg shadow-lg max-w-sm w-full">
                        <div className="text-center bg-bronze-500 text-white py-2 rounded-t-lg">
                            <span className="text-xl font-semibold">3rd Place 🥉</span>
                        </div>
                        <ContentCard content={contents[2]} />
                    </div>
                </div>
            )}
        </div>
    </div>
</div>



    );
}