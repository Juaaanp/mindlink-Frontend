'use client';

import { useEffect, useState } from 'react';
import ContentCard from '@/components/ContentComponents/ContentCard';
import { Content } from '@/types/Content';

type ContentsProps = {
    type?: string;
    searchQuery?: string;
};

export default function Contents({ type, searchQuery }: ContentsProps) {
    const [contents, setContents] = useState<Content[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchContents = async () => {
            setLoading(true);
            setError('');
            try {
                let data: Content[] = [];

                if (searchQuery && searchQuery.trim() !== "") {
                    // Buscar por título
                    const titleRes = await fetch(`http://localhost:8090/contents/title/${encodeURIComponent(searchQuery)}`, {
                        method: "GET",
                        credentials: "include",
                    });


                    if (!titleRes.ok) throw new Error("Error searching by title");
                    data = await titleRes.json();

                    // Si no hay resultados por título, buscar por autor
                    if (data.length === 0) {
                        const authorRes = await fetch(`http://localhost:8090/contents/author/${encodeURIComponent(searchQuery)}`, {
                            method: "GET",
                            credentials: "include",
                          });

                        if (!authorRes.ok) throw new Error("Error searching by author");
                        data = await authorRes.json();
                    }

                } else if (type) {
                    // Buscar por tipo
                    const typeRes = await fetch(`http://localhost:8090/contents/type/${encodeURIComponent(type)}`, {
                        method: "GET",
                        credentials: "include",
                      });

                    if (!typeRes.ok) throw new Error("Error searching by type");
                    data = await typeRes.json();

                } else {
                    // Cargar todos los contenidos
                    const allRes = await fetch('http://localhost:8090/contents/withAuthorName', {
                        method: "GET",
                        credentials: "include",
                    });

                    if (!allRes.ok) throw new Error("Error loading contents");
                    data = await allRes.json();
                }

                setContents(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchContents();
    }, [type, searchQuery]);

    if (loading) {
        return (
            <div className="flex justify-center my-4">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-500"></div>
            </div>
        );
    }

    if (error) {
        return <p className="text-red-500 text-center">{error}</p>;
    }

    if (contents.length === 0) {
        return <p className="text-gray-400 text-center mt-6">No contents found.</p>;
    }

    return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contents.map((item, index) => (
                <ContentCard key={index} content={item} />
            ))}
        </div>
    );
}

