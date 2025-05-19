
'use client';

import React, { useEffect, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import api from '@/lib/api';
import { StudentGraphDTO } from '@/types/StudentGraphDTO';

interface Props {
  studentId: string;
}

export default function StudentGraph({ studentId }: Props) {
  const [graphData, setGraphData] = useState<{
    nodes: { id: string }[];
    links: { source: string; target: string }[];
  }>({ nodes: [], links: [] });

  useEffect(() => {
    const fetchGraph = async () => {
      const res = await api.get<StudentGraphDTO>(
        `/students/affinity/subgraph/${studentId}`
      );

      const { studentId: center, connections } = res.data;

      // Garantizar nodos únicos
      const allIds = Array.from(new Set([center, ...connections]));
      const formattedNodes = allIds.map(id => ({ id }));

      const formattedLinks = connections.map(id => ({
        source: center,
        target: id,
      }));

      setGraphData({ nodes: formattedNodes, links: formattedLinks });
    };

    fetchGraph();
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






