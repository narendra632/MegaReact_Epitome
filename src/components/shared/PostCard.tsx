import { Models } from "appwrite";
import { Link } from "react-router-dom";

type PostCardProps = {
    post: Models.Document;
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <div className="post-card">
        <div className="flex-between">
            <div className="flex items-center gap-3">
                <Link to={`/profile/${post.creator.$id}`}>
                    <img src={post?.creator?.imageUrl || '/assets/icons/profile-placeholder.svg'} className="rounded-full w-12 lg:h-12" alt="creator" /> 
                </Link>
                <div className="flex flex-col">
                    <p className="base-medium lg:body-bold text-light-1">{post.creator.name}</p>
                    <div>
                        <p>{post.$createdAt}</p>- <p>{post.location}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PostCard