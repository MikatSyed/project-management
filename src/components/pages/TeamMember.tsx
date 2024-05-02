import React from 'react';

const TeamMember = ({teamMembers}:any) => {
    return (
        <div>
                    <div className="mt-8">
  <h2 className="text-xl font-semibold mb-4">Team Members</h2>
  <div className="grid grid-cols-2 gap-4">
    {teamMembers.map((member: any) => (
      <div key={member} className="bg-white rounded-lg shadow-md p-4 flex items-center">
        <div className="rounded-full overflow-hidden mr-4 bg-gray-200 w-12 h-12 flex justify-center items-center">
          <span className="text-gray-600 text-lg">{member[0]}</span>
        </div>
        <p className="text-gray-800 font-medium">{member}</p>
      </div>
    ))}
  </div>
</div>
        </div>
    );
};

export default TeamMember;