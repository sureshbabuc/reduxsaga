import { call, put, take, fork, cancel, all } from "redux-saga/effects";

import {
  GET_POSTS_FETCH,
  GET_COMMENTS_FETCH,
  GET_USERS_FETCH,
  GET_POSTS_SUCCESS,
  GET_COMMENTS_SUCCESS,
  GET_USERS_SUCCESS,
  EXIT_APP,
  GENERAL_FAILURE
} from "./actions";

import { getPosts, getComments, getUsers } from "./apis";

function* getPostsSaga() {
  while (true) {
    try {
      console.log("getPosts action ready...");
      yield take(GET_POSTS_FETCH);
      console.log("getPosts action started...");
      const posts = yield call(getPosts);
      console.log("getPosts action fetched...");
      console.log("posts: ", posts);
      yield put({ type: GET_POSTS_SUCCESS, posts: posts });
      console.log("getPosts action finished...");
    } catch (error) {
      console.log("getPosts action failed...");
      console.log("ERROR P: ", error);
      yield put({ type: GENERAL_FAILURE, error: error });
      console.log("getPosts action error finished...");
    }
  }
}

function* getCommentsSaga() {
  while (true) {
    try {
      console.log("getComments action ready...");
      yield take(GET_COMMENTS_FETCH);
      console.log("getComments action started...");
      const comments = yield call(getComments);
      console.log("getComments action fetched...");
      yield put({ type: GET_COMMENTS_SUCCESS, comments: comments });
      console.log("getComments action finished...");
    } catch (error) {
      console.log("getComments action general failed...");
      console.log("ERROR C: ", error);
      yield put({ type: GENERAL_FAILURE, error: error });
      console.log("getComments action general error finished...");
    }
  }
}

function* getUsersSaga() {
  while (true) {
    try {
      console.log("getUsers action ready...");
      yield take(GET_USERS_FETCH);
      console.log("getUsers action started...");
      const users = yield call(getUsers);
      console.log("getUsers action fetched...");
      yield put({ type: GET_USERS_SUCCESS, users: users });
      console.log("getUsers action finished...");
    } catch (error) {
      console.log("getUsers action general failed...");
      console.log("ERROR U: ", error);
      yield put({ type: GENERAL_FAILURE, error: error });
      console.log("getUsers action general error finished...");
    }
  }
}

export default function* mySaga() {
  const posts = yield fork(getPostsSaga);
  const comments = yield fork(getCommentsSaga);
  const users = yield fork(getUsersSaga);
  console.log("Now waiting for action from user...");
  yield take(EXIT_APP);
  console.log("Exiting App...");
  yield all([cancel(posts), cancel(comments), cancel(users)]);
  console.log("Exit Finished...");
}
