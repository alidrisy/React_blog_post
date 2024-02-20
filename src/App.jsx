import Home from "./Home";
import Layout from "./Layout";
import NewPosts from "./NewPosts";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing";
import EditPost from "./EditPost";
import Signup from "./Signup";
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";
import api from './api/post';

function App() {
  
  // eslint-disable-next-line no-unused-vars
  const [posts, setPosts] = useState([])

  const [search, setSearch] = useState('')

  const [searchedPosts, setSearchedPosts] = useState([])

  const [postTitle, setPostTitle] = useState('')

  const [postBody, setPostBody] = useState('')

  const [editTitle, setEditTitle] = useState('')

  const [editBody, setEditBody] = useState('')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const axFetch = async () => {
      try {
        const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
        const newPost = { id, title: postTitle, body: postBody }
        const data = await api.post('/posts', newPost)
        const postsList = [...posts, data.data]
        setPosts(postsList)
        setPostBody('')
        setPostTitle('')
        navigate('/')
      } catch(e) {
        console.log(e.message)
      }
    }
    axFetch();
  }

  useEffect(() => {
    const postsList = posts.filter((post) => (
      (((post.title).toLocaleLowerCase()).includes(search.toLowerCase()) ||
      ((post.body).toLocaleLowerCase()).includes(search.toLowerCase()))
    ))

    setSearchedPosts(postsList)
  }, [search, posts])

  useEffect(() => {
    const axFetch = async () => {
      try {
        const data = await api.get('/posts')
        setPosts(data.data)
      } catch(e) {
        console.log(e.message)
      }
    }
    axFetch();
  }, [])

  const handleDelete = async (id) => {
    const postsList = posts.filter((post) => post.id !== id)
    try {
      await api.delete(`/posts/${id}`)
    } catch(e) {
      console.log(e.message)
    }
    setPosts(postsList)
    navigate('/')
  }

  const handleEdit = (id) => {
    const axFetch = async (id) => {
      try {
        const postsL = posts.filter((post) => post.id !== id)
        const newPost = { id, title: editTitle, body: editBody }
        const data = await api.put('/posts', newPost)
        const postsList = [...postsL, data.data]
        setPosts(postsList)
        setEditBody('')
        setEditTitle('')
        navigate(`/post/${id}`)
      } catch(e) {
        console.log(e.message)
      }
    }
    axFetch(id);
  }


  return (
      <Routes>
        <Route element={ <Layout
          search={search}
          setSearch={setSearch}
        />}>
          <Route index element={<Home posts={searchedPosts.reverse()} />} />
          <Route path="signup" element={<Signup />} />
          <Route path="/post">
            <Route index element={<NewPosts
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}
              handleSubmit={handleSubmit}
            />} />
            <Route path=":id" element={<PostPage posts={posts} handleDelete={handleDelete} />} />
          </Route>
          <Route path="/edit/:id" element={<EditPost
              editTitle={editTitle}
              setEditTitle={setEditTitle}
              editBody={editBody}
              setEditBody={setEditBody}
              posts={posts}
              handleEdit={handleEdit}
          />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
  );
}

export default App;
