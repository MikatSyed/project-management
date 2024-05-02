import React from 'react';

const RecentActivities = ({recentActivities}:any) => {
    return (
        <div>
            <div className="mt-8">
  <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
  <ul>
    {recentActivities.map((activity: any) => (
      <li key={activity.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
        <p className="text-gray-800 font-medium">{activity.description}</p>
        <p className="text-gray-500 text-sm">{activity.timestamp}</p>
      </li>
    ))}
  </ul>
</div>
        </div>
    );
};

export default RecentActivities;