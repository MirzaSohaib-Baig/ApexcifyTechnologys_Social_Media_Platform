const { hash } = require("bcrypt");
const {User, Post, Comment, Follow, Like} = require("../models");

const transformUser = (user = User) => {
    return {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        full_name: user.full_name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        bio: user.bio,
        profile_pic: user.profile_pic,
        cover_pic: user.cover_pic,
        location: user.location,
        followers_count: user.followers_count || 0,
        following_count: user.following_count || 0,
        created_at: user.createdAt
    };
};

const transformPost = (post = Post) => {
    return {
        id: post.id,
        content: post.content,
        image: post.image,
        hashtags: post.hashtags,
        likes_count: post.likes_count,
        comments_count: post.comments_count,
        user: post?.user?.id ? transformUser(post.user) : post.user,  // Include user info if populated
        share_with: post.share_with,
        created_at: post.createdAt,
        updated_at: post.updatedAt
    };
};

const transformComment = (comment = Comment) => {
    return {
        id: comment.id,
        content: comment.content,
        likes_count: comment.likes_count,
        parent_comment: comment.parent_comment ?? null,
        user: comment?.user?.id ? transformUser(comment.user) : comment.user,  // Include user info if populated
        post: comment?.post?.id ? transformPost(comment.post) : comment.post,  // Include post info if populated
        created_at: comment.createdAt
    };
};

const transformLike = (like = Like) => {
    return {
        id: like.id,
        user: like?.user?.id ? transformUser(like.user) : like.user,  // Include user info if populated
        post: like?.post?.id ? transformPost(like.post) : like.post,  // Include post info if populated
        comment: like?.comment?.id ? transformComment(like.comment) : like.comment,  // Include comment info if populated
        created_at: like.createdAt
    };
};

const transformFollow = (follow = Follow) => {
    return {
        id: follow.id,
        follower: follow?.follower?.id ? transformUser(follow.follower) : follow.follower,  // Include follower info if populated
        following: follow?.following?.id ? transformUser(follow.following) : follow.following,  // Include following info if populated
        created_at: follow.createdAt
    };
}

module.exports = { transformUser, transformPost, transformComment, transformLike, transformFollow };