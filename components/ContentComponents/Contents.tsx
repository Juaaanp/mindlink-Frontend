'use client';

import { useEffect, useState } from 'react';
import ContentCard from '@/components/ContentComponents/ContentCard';
import { Content } from '@/types/Content';

export default function Contents() {
    const [contents, setContents] = useState<Content[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchContents = async () => {
            try {
                const response = await fetch('http://localhost:8090/contents/withAuthorName');
                if (!response.ok) throw new Error('Error loading contents');
                const data: Content[] = await response.json();
                setContents(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchContents();
    }, []);

    if (loading) return (
        <div className="flex justify-center my-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-500"></div>
        </div>);
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contents.map((item, index) => (
                <ContentCard key={index} content={item} />
            ))}
        </div>
    );
}
