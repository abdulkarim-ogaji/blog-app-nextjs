import {
  faChessBishop,
  faHeart,
  faNewspaper,
} from "@fortawesome/free-regular-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import Spinner from "../../components/Spinner";
import { request } from "../../utils/axios-utils";
import { dateToMonthDay } from "../../utils/date-utils";
import { MyResponseType, User } from "../../utils/types";

const fetchUser = () => {
  return request({ url: "/users/me" });
};

const Profile = () => {
  const router = useRouter();
  const { data, isSuccess, isLoading } = useQuery<MyResponseType<User>>(
    ["me"],
    fetchUser,
    {
      onError(err) {
        router.push("/login");
      },
    }
  );

  if (isLoading) return <Spinner />;

  if (isSuccess) {
    const { data: user } = data.data;
    return (
      <div>
        <div className="bg-mybg p-24"></div>
        <div className="flex items-center flex-col md:w-2/3 w-4/5 my-center gap-4">
          <div className="-mt-12 bg-white relative border rounded-lg container p-4 md:pt-20 pt-12 text-center">
            <div className="absolute md:-top-16 -top-8 border-8 rounded-full bg-myborder profile-image">
              <div className="relative md:w-32 md:h-32 h-16 w-16">
                <Image
                  src={user.picture || "/default_avatar.jfif"}
                  alt="default_avatar"
                  layout="fill"
                  style={{ borderRadius: 999 }}
                />
              </div>
            </div>
            <div className="text-end">
              <button className="p-2 text-xs px-4 action-btn2 rounded-lg">
                Edit Profile
              </button>
            </div>
            <h1 className="md:text-2xl text-lg font-semibold my-4">
              {user.firstName} {user.lastName}
            </h1>
            <p className="my-4">{user.about}</p>
            <p className="my-8 text-gray-400">
              Joined {dateToMonthDay(user.createdAt)}{" "}
              <FontAwesomeIcon icon={faChessBishop} color="#777" />
            </p>
          </div>
          <div className="flex md:gap-4 gap-2 flex-wrap md:flex-nowrap container text-xs md:text-sm">
            <div className="md:w-1/3 container bg-white border rounded-lg p-2 bg-gray-100">
              <div className="my-2 p-2">
                <FontAwesomeIcon icon={faNewspaper} color="#777" /> Blogs
                written({user.blogCount})
              </div>
              <div className="my-2 p-2">
                <FontAwesomeIcon icon={faPen} color="#777" /> Comments written(
                {user.comments.length})
              </div>
              <div className="my-2 p-2">
                <FontAwesomeIcon icon={faHeart} color="#777" /> Tags Followed
              </div>
            </div>
            <div className="md:w-2/3 container bg-white border rounded-lg p-2">
              <h2 className="text-lg font-semibold mb-4">Recent Comments</h2>
              {user.comments.map((com) => (
                <Link href={`/blogs/${com.blog}`} key={com._id} passHref>
                  <a className="p-2 cursor-pointer hover:bg-gray-100 focus:bg-gray-100 block">
                    {com.text}
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Profile;
