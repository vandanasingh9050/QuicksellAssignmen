import React, { useState, useEffect } from "react";
import axios from "axios";
import Column from "./column";
import ComboBox from "./combobox";
const initialState = {
  col1: { title: "", tickets: [] },
  col2: { title: "", tickets: [] },
  col3: { title: "", tickets: [] },
  col4: { title: "", tickets: [] },
  col5: { title: "", tickets: [] },
};
const CanbanBoard = () => {
  const [groupby, setGroupby] = useState("status");

  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouped_tickets, setGrouped_tickets] = useState(initialState);
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );
        setTickets(response.data.tickets);
        setUsers(response.data.users);
        console.log(response.data.tickets);
        console.log(response.data.users);
        setGroupby("status");
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, []);

  const groupTicketsByPriority = () => {
    const priorities = ["No Priority", "Low", "Medium", "High", "Urgent"];

    // Initialize grouped tickets structure
    const tempGroupedTickets = {
      col1: { title: "No Priority", tickets: [] },
      col2: { title: "Low", tickets: [] },
      col3: { title: "Medium", tickets: [] },
      col4: { title: "High", tickets: [] },
      col5: { title: "Urgent", tickets: [] },
    };

    tickets.forEach((ticket) => {
      const columnKey = `col${ticket.priority + 1}`;
      tempGroupedTickets[columnKey].tickets.push(ticket);
    });

    setGrouped_tickets(tempGroupedTickets);
  };

  const groupTicketsByStatus = () => {
    const tempGroupedTickets = {
      col1: { title: "Todo", tickets: [] },
      col2: { title: "Done", tickets: [] },
      col3: { title: "In Progress", tickets: [] },
      col4: { title: "Cancelled", tickets: [] },
      col5: { title: "Backlog", tickets: [] },
    };

    tickets.forEach((ticket) => {
      if (ticket.status === "Todo") {
        tempGroupedTickets.col1.tickets.push(ticket);
      } else if (ticket.status === "Done") {
        tempGroupedTickets.col2.tickets.push(ticket);
      } else if (ticket.status === "In progress") {
        tempGroupedTickets.col3.tickets.push(ticket);
      } else if (ticket.status === "Cancelled") {
        tempGroupedTickets.col4.tickets.push(ticket);
      } else if (ticket.status === "Backlog") {
        tempGroupedTickets.col5.tickets.push(ticket);
      }
    });

    setGrouped_tickets(tempGroupedTickets);
  };

  const groupTicketsByUser = () => {
    const userMap = {
      "usr-1": "col1",
      "usr-2": "col2",
      "usr-3": "col3",
      "usr-4": "col4",
      "usr-5": "col5",
    };

    const tempGroupedTickets = {
      col1: { title: "", tickets: [] },
      col2: { title: "", tickets: [] },
      col3: { title: "", tickets: [] },
      col4: { title: "", tickets: [] },
      col5: { title: "", tickets: [] },
    };

    tickets.forEach((ticket) => {
      const user = users.find((user) => user.id === ticket.userId);
      if (user) {
        const columnKey = userMap[ticket.userId];
        if (columnKey) {
          tempGroupedTickets[columnKey].title =
            tempGroupedTickets[columnKey].title || user.name;
          tempGroupedTickets[columnKey].tickets.push(ticket);
        }
      }
    });

    setGrouped_tickets(tempGroupedTickets);
  };

  useEffect(() => {
    console.log("in use effect");
    if (groupby === "priority") {
      console.log("in priority");
      groupTicketsByPriority();
    } else if (groupby === "status") {
      console.log("status");
      groupTicketsByStatus();
      console.log(grouped_tickets);
    } else {
      console.log("user");
      groupTicketsByUser();
    }
  }, [groupby, tickets]);

  return (
    <>
      <div className="w-1/5 no-underline">
        <ComboBox setGroupby={setGroupby} groupby={groupby} />
      </div>
      <div className="flex space-x-6 p-4 bg-gray-100">
        {Object.keys(grouped_tickets).map((key, index) => (
          <Column
            key={index}
            title={grouped_tickets[key].title}
            tickets={grouped_tickets[key].tickets}
            byPriority={groupby == "priority"}
            byStatus={groupby == "status"}
            byUser={groupby == "user"}
          />
        ))}
      </div>
    </>
  );
};

export default CanbanBoard;
