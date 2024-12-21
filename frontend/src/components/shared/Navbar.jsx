import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">Portal</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <button className="border px-4 py-2 rounded hover:bg-gray-100">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-[#6A38C2] text-white px-4 py-2 rounded hover:bg-[#5b30a6]">
                  Signup
                </button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer w-10 h-10">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              {/* Increased Width and Balanced Space */}
              <PopoverContent className="w-72 p-4 rounded-lg shadow-lg border">
                <div className="flex items-center gap-5 mb-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-base">
                      {user?.fullname}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  {user && user.role === "student" && (
                    <div className="flex items-center gap-2 hover:bg-gray-100 rounded p-2 cursor-pointer">
                      <User2 className="text-gray-600" />
                      <Link
                        to="/profile"
                        className="text-blue-600 hover:underline focus:outline-none focus:ring-0"
                      >
                        View Profile
                      </Link>
                    </div>
                  )}
                  <div className="flex items-center gap-2 hover:bg-gray-100 rounded p-2 cursor-pointer">
                    <LogOut className="text-gray-600" />
                    <button
                      onClick={logoutHandler}
                      className="text-blue-600 hover:underline focus:outline-none focus:ring-0"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
