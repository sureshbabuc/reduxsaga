import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  GET_POSTS_FETCH,
  GET_COMMENTS_FETCH,
  GET_USERS_FETCH,
  SELECTED_POST,
  EXIT_APP
} from "./actions";

import {
  allPosts,
  selectedPost,
  getCommentsForPost,
  getAuthorForPost
} from "./selectors";

function App() {
  const myDispatch = useDispatch();

  const retrivedPosts = useSelector(allPosts);
  const selPost = useSelector(selectedPost);
  const selPostComments = useSelector(getCommentsForPost);
  const selPostAuthor = useSelector(getAuthorForPost);

  const [selectedPostModeOn, setSelectedPostModeOn] = useState(false);

  useEffect(() => {
    // Get all the data at start. As we'll use selector to slice and show data.
    myDispatch(GET_POSTS_FETCH());
    myDispatch(GET_COMMENTS_FETCH());
    myDispatch(GET_USERS_FETCH());
  }, [myDispatch]);

  function postSelected(selectedPost) {
    myDispatch(SELECTED_POST(selectedPost));
  }

  // console.log(retrivedPosts);

  return (
    <div className="App">
      <h3>The Blog App</h3>

      {selectedPostModeOn && (
        <div>
          {/* Back Button */}
          <button
            onClick={() => {
              // If you want you can make the selected post empty here. Handle this action in sagas and update the reducer to update selected post to empty or undefined in global state.
              myDispatch(EXIT_APP());
              setSelectedPostModeOn(false); // Because I have jsut one view so I'm hiding and showing UI accordingly
            }}
          >
            Back
          </button>
          <br />
          {/* Post */}
          <hr />
          <div>
            <code>Post Id: {selPost ? selPost.id : "No post selected"}</code>
            <h1>{selPost.title}</h1>
            <p>{selPost.body}</p>
            <p>
              <i>Written By: {selPostAuthor.name}</i>
            </p>
          </div>
          <hr />
          {/* Comments */}
          <p style={{ fontSize: 12, fontWeight: "bold" }}>
            Comments ({selPostComments.length}):
          </p>
          {selPostComments &&
            selPostComments.map((comment) => (
              <div
                key={comment.id}
                style={{
                  backgroundColor: "#e8e8e8",
                  padding: 8,
                  marginBottom: 8,
                  borderRadius: 8
                }}
              >
                <p style={{ fontSize: 12, color: "#7d7d7d" }}>
                  {comment.name}
                  <br />
                  {comment.email}
                </p>
                <p style={{ fontSize: 12, fontWeight: "bold" }}>
                  {comment.body}
                </p>
              </div>
            ))}
        </div>
      )}

      {/* Posts View / Home View */}
      {!selectedPostModeOn && (
        <div>
          <p>
            <b>Select a blog post from blow to read more:</b>
          </p>
          <hr />
          {retrivedPosts &&
            retrivedPosts.map((post) => (
              <a
                href={`/#${post.id}`}
                onClick={() => {
                  postSelected(post);
                  setSelectedPostModeOn(true);
                }}
                key={post.id}
              >
                {post.id}: {post.title}
                <br />
              </a>
            ))}
        </div>
      )}
    </div>
  );
}

export default App;
