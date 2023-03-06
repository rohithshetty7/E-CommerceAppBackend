import React, { useEffect, useState } from "react";
import axios from "axios";
export default function DataFetching() {
  const [post, setPost] = useState({});
  const [id, setId] = useState(1);
  const [buttonValue, setButtonValue] = useState(1);

  console.log(id);
  console.log(post);
  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${buttonValue}`)
      .then((res) => {
        console.log(res.data);
        setPost(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("Im exceting aways");
      });
  }, [buttonValue]);
  const handleClick = () => {
    setButtonValue(id);
  };
  return (
    <div>
      Content
      <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
      <button type="button" onClick={handleClick}>
        Fetch
      </button>
      {/* {<li>{post.id}</li>} */}
      <ul>{<li>{post.title}</li>}
      </ul>
      {/* <ul>
        {post.length && post?.map((v) => <li key={v?.id}>{v?.title}</li>)}
      </ul> */}
    </div>
  );
}
