
'use client';

import React, { useEffect, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import api from '@/lib/api';
import { FullGraphDTO } from '@/types/FullGraphDTO';

export default function ModeratorGraph() {
  const [graphData, setGraphData] = useState<{
  nodes: { id: string; name: string }[];
  links: { source: string; target: string }[];
}>({ nodes: [], links: [] });


  useEffect(() => {
  const fetchGraph = async () => {
    const response = await api.get<FullGraphDTO>('/students/affinity/fullgraph');
    const { nodes, links } = response.data;

    setGraphData({ nodes, links });
  };

  fetchGraph();
}, []);

  return (
    <div className="w-full h-[600px]">
      <ForceGraph2D
        graphData={graphData}
        nodeAutoColorBy="id"
        linkColor={() => 'rgba(0,255,255,0.5)'}
        nodeLabel={(node) => `Nombre: ${node.name}`}
      />
    </div>
  );
}


