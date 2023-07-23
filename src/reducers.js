import { createReducer } from "@reduxjs/toolkit";
import {
  GET_USERS_SUCCESS,
  GET_POSTS_SUCCESS,
  GET_COMMENTS_SUCCESS,
  GENERAL_FAILURE,
  SELECTED_POST
} from "./actions";

export const globalState = {};

const myReducer = createReducer(globalState, (builder) => {
  builder
    .addCase(GET_POSTS_SUCCESS, (state, action) => {
      state.posts = action.posts;
    })
    .addCase(GET_COMMENTS_SUCCESS, (state, action) => {
      state.comments = action.comments;
    })
    .addCase(SELECTED_POST, (state, action) => {
      state.selectedPost = action.payload.selectedPost;
    })
    .addCase(GET_USERS_SUCCESS, (state, action) => {
      state.users = action.users;
    })
    .addCase(GENERAL_FAILURE, (state, action) => {
      console.log("ERROR IS: ", action.error);
      state.error = action.error;
    })
    .addDefaultCase(() => {});
});

export default myReducer;
