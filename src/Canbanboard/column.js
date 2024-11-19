import React from "react";
import Card from "./../Card/card";

const Column = ({ title, tickets, byUser, byStatus, byPriority }) => {
  const imagSrc = byUser ? `/Images/avatar.jpg` : `/Images/${title}.svg`;

  return (
    <div className="w-1/5 text-[12px] font-normal flex flex-col space-y-2">
      <div className="flex justify-between">
        <div className="flex flex-row gap-x-2 items-center">
          <img
            src={imagSrc}
            className="h-5 w-5 rounded-full"
            alt="Column Icon"
          />
          <span className="text-xs font-medium">{title}</span>
          <span className="text-red-500 text-xs ml-1">2</span>
        </div>
        <div className="flex flex-row p-r-2">
          {/* Placeholder for images if needed */}
          <img
            src="/Images/add.svg"
            className="rouded-full h-5 w-5"
            alt="Image 1"
          />
          <img
            src="/Images/menu.svg"
            className="rouded-full h-5 w-5"
            alt="Image 2"
          />
        </div>
      </div>
      <div className="flex flex-col gap-y-2 rounded-md shadow-md">
        {tickets.map((ticket) => {
          return (
            <Card
              key={ticket.id}
              ticket={ticket}
              byPriority={byPriority}
              byUser={byUser}
              byStatus={byStatus}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Column;
