'use client';

import React, { useEffect, useState } from 'react';
import api from '@/lib/api';
import UICard from '@/components/Uicard';
import NavBarModerator from '../../NavBar';

export default function HelpRequestReportPage() {
  const [reportData, setReportData] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await api.get<Record<string, number>>('/helpRequests/helpRequestReport');
        setReportData(response.data);
      } catch (error) {
        console.error('Error fetching help request report:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 p-28 text-white font-poppins">
      <NavBarModerator/>
      <UICard className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">Help Request Report</h1>

        {loading ? (
          <p className="text-center text-blue-200">Loading...</p>
        ) : (
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-blue">
                <th className="px-4 py-2 bg-[#2F3C63] rounded-l-xl">Student Name</th>
                <th className="px-4 py-2 bg-[#05BCC2] text-center rounded-r-xl">Help Requests</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(reportData).map(([name, count]) => (
                <tr key={name} className="bg-white/10 text-white rounded-xl">
                  <td className="px-4 py-2 rounded-l-xl">{name}</td>
                  <td className="px-4 py-2 rounded-r-xl text-center">{count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </UICard>
    </div>
  );
}

