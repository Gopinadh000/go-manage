import React from "react";
import UserCard from "./components/UserCard";


export const users = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    role: "Admin",
    designation: "Product Manager",
    email: "john.doe@company.com",
    mobile: "+91 98765 43210",
    status: "active",
    profilePic: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 2,
    firstName: "Sarah",
    lastName: "Wilson",
    role: "Manager",
    designation: "Project Manager",
    email: "sarah.wilson@company.com",
    mobile: "+91 98765 43211",
    status: "active",
    profilePic: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: 3,
    firstName: "Michael",
    lastName: "Chen",
    role: "Developer",
    designation: "Frontend Developer",
    email: "michael.chen@company.com",
    mobile: "+91 98765 43212",
    status: "inactive",
    profilePic: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: 4,
    firstName: "Emily",
    lastName: "Davis",
    role: "Designer",
    designation: "UI/UX Designer",
    email: "emily.davis@company.com",
    mobile: "+91 98765 43213",
    status: "active",
    profilePic: "https://i.pravatar.cc/150?img=32",
  },
];


const UserCards = () => {
  return (
    <div
      className="
        h-full
        overflow-y-auto
        overflow-x-hidden
        bg-app-bg
        p-4
        tablet:p-5
        laptop:p-6
      "
    >
      <div
        className="
          grid
          grid-cols-1
          gap-4
          tablet:grid-cols-2
          laptop:grid-cols-3
          desktop:grid-cols-4
        "
      >
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
          />
        ))}
      </div>
    </div>
  );
};

export default UserCards;
