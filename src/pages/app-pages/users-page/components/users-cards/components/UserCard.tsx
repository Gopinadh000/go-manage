import MoreVertIcon from "@mui/icons-material/MoreVert";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import { MailOutlineOutlined } from "@mui/icons-material";

interface UserCardProps {
  user: {
    id: number;
    firstName: string;
    lastName: string;
    role: string;
    designation: string;
    email: string;
    mobile: string;
    status: string;
    profilePic: string;
  };
}

const UserCard = ({ user }: UserCardProps) => {
  const fullName = `${user.firstName} ${user.lastName}`;
  const isActive = user.status === "active";

  return (
    <div
      className="
        group
        w-full
        rounded-xl
        border
        border-app-border
        bg-app-surface
        p-4
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:border-app-border-strong
        hover:shadow-md
      "
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        {/* User */}
        <div className="flex min-w-0 items-center gap-3">
          {/* Avatar */}
          <div className="relative shrink-0">
            <img
              src={user.profilePic}
              alt={fullName}
              className="
                h-14
                w-14
                rounded-full
                object-cover
                ring-2
                ring-app-surface
              "
            />
            <span
              className={`
                absolute
                bottom-0
                right-0
                h-3.5
                w-3.5
                rounded-full
                border-2
                border-app-surface
                ${isActive ? "bg-app-success" : "bg-app-warning"}
              `}
            />
          </div>

          {/* Name + Role */}
          <div className="min-w-0">
            <h3 className="truncate text-[15px] font-semibold text-app-text">
              {fullName}
            </h3>
            <div className="mt-1.5 flex min-w-0 flex-wrap gap-1.5">
              <span className="inline-flex items-center rounded-full bg-app-primary-50 px-2 py-0.5 text-[11px] font-medium text-app-primary-800">
                {user.role}
              </span>

              <span
                className="
                  inline-flex
                  max-w-[140px]
                  truncate
                  items-center
                  rounded-full
                  bg-app-surface-muted
                  px-2
                  py-0.5
                  text-[11px]
                  font-medium
                  text-app-text-secondary
                "
              >
                {user.designation}
              </span>
            </div>
          </div>
        </div>

        {/* Menu */}
        <button
          type="button"
          className="
            -mr-1
            -mt-1
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-md
            text-app-text-muted
            transition-colors
            hover:bg-app-bg
            hover:text-app-text
          "
        >
          <MoreVertIcon sx={{ fontSize: 20 }} />
        </button>
      </div>

      <div className="my-4 h-px bg-app-border" />

      <div className="space-y-2.5">
        <div className="flex min-w-0 items-center gap-2.5">
          <div
            className="
              flex
              h-7
              w-7
              shrink-0
              items-center
              justify-center
              rounded-md
              bg-app-surface-muted
              text-app-text-muted
            "
          >
            <MailOutlineOutlined sx={{ fontSize: 16 }} />
          </div>

          <span className="min-w-0 truncate text-[12px] text-app-text-secondary">
            {user.email}
          </span>
        </div>

        <div className="flex min-w-0 items-center gap-2.5">
          <div
            className="
              flex
              h-7
              w-7
              shrink-0
              items-center
              justify-center
              rounded-md
              bg-app-surface-muted
              text-app-text-muted
            "
          >
            <PhoneOutlinedIcon sx={{ fontSize: 16 }} />
          </div>
          <span className="text-[12px] text-app-text-secondary">
            {user.mobile}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
