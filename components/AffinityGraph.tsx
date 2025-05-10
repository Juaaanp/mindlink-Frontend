'use client';
import React, { useEffect, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import api from '@/lib/api';
import { StudentGraphDTO } from '@/types/StudentGraphDTO';

export default function AffinityGraph({ studentId }: { studentId: string }) {
  const [graphData, setGraphData] = useState<{
    nodes: { id: string }[];
    links: { source: string; target: string }[];
  }>({
    nodes: [],
    links: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get<StudentGraphDTO>(`/affinity/${studentId}`);
      const { studentId: centralStudentId, connections } = response.data;

      const nodes = [{ id: centralStudentId }, ...connections.map((id: string) => ({ id }))];
      const links = connections.map((id: string) => ({ source: centralStudentId, target: id }));

      setGraphData({ nodes, links });
    };

    fetchData();
  }, [studentId]);

  return (
    <div className="w-full h-[600px]">
      <ForceGraph2D
        graphData={graphData}
        nodeAutoColorBy="id"
        linkColor={() => 'rgba(0,255,255,0.5)'}
        nodeLabel="id"
      />
    </div>
  );
}




