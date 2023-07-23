import { createAction } from "@reduxjs/toolkit";

export const GET_POSTS_FETCH = createAction("GET_POSTS_FETCH");
export const GET_COMMENTS_FETCH = createAction("GET_COMMENTS_FETCH");
export const GET_USERS_FETCH = createAction("GET_USERS_FETCH");

export const GET_POSTS_SUCCESS = createAction("GET_POSTS_SUCCESS");
export const GET_COMMENTS_SUCCESS = createAction("GET_COMMENTS_SUCCESS");
export const GET_USERS_SUCCESS = createAction("GET_USERS_SUCCESS");

// Action which takes post as parameter. This is optional as createAction creates can be used as a string or function.
export const SELECTED_POST = createAction("SELECTED_POST", (post) => {
  return {
    payload: {
      selectedPost: post
    }
  };
});

export const EXIT_APP = createAction("EXIT_APP");
export const GENERAL_FAILURE = createAction("GENERAL_FAILURE");
