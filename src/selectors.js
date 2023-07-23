import { createSelector } from "reselect";

export const allPosts = (state) => state.myReducer.posts;
const allComments = (state) => state.myReducer.comments;
const allUsers = (state) => state.myReducer.users;

export const selectedPost = (state) => state.myReducer.selectedPost;

export const getCommentsForPost = createSelector(
  allComments,
  selectedPost,
  (c, p) => {
    if (c && p) {
      const filteredComments = c.filter((comment) => {
        return comment.postId === p.id;
      });
      return filteredComments;
    }
  }
);

export const getAuthorForPost = createSelector(
  allUsers,
  selectedPost,
  (u, p) => {
    if (u && p) {
      const author = u.find((user) => {
        return p.userId === user.id;
      });
      return author;
    }
  }
);
