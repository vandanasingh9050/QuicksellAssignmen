import React from "react";

const Card = ({ ticket, byUser, byStatus, byPriority }) => {
  const priority_map = ["No Priority", "Low", "Medium", "High", "Urgent"];
  return (
    <div className="bg-white border no-underline border-gray-300 rounded-lg p-3 shadow-sm flex items-start max-w-xs h-32">
      <div className="flex-grow">
        <div className="text-gray-500 text-xs font-medium no-underline">
          {ticket.id}
        </div>
        <div className="flex items-center space-x-2">
          {!byStatus && (
            <img
              src={`/Images/${ticket.status}.svg`}
              alt="Ticket Status"
              className="w-3 h-3 rounded-full flex-shrink-0"
            />
          )}
          <h2 className="text-sm font-semibold no-underline text-gray-900 mt-1 line-clamp-2">
            {ticket.title}
          </h2>
        </div>
        <div className="flex items-center  space-x-2 mt-3">
          {!byPriority && (
            <img
              src={`/Images/${priority_map[ticket.priority - 1]}.svg`}
              alt="Ticket Status"
              className="w-3 h-3 rounded-full flex-shrink-0"
            />
          )}{" "}
          <span className="inline-flex items-center no-underline px-2 py-0.5  text-gray-600 text-xs font-medium rounded">
            {ticket.tag[0]}
          </span>
        </div>
      </div>
      {!byUser && (
        <div className="ml-4 flex-shrink-0">
          <img
            src="/Images/avatar.jpg"
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
        </div>
      )}
    </div>
  );
};

export default Card;
