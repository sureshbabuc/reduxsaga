import axios from "axios";

export async function getPosts() {
  console.log("Now calling getPosts API");
  return await axios
    .get("https://jsonplaceholder.typicode.com/posts")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
}

export async function getComments() {
  console.log("Now calling getComments API");
  return await axios
    .get("https://jsonplaceholder.typicode.com/comments")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
}

export async function getUsers() {
  console.log("Now calling getUsers API");
  return await axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
}
