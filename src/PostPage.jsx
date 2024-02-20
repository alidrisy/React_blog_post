/* eslint-disable react/prop-types */
import { useParams, Link } from "react-router-dom"

const PostPage = ({ posts, handleDelete }) => {

    const { id } = useParams()

    const post = posts.find((post) => (post.id).toString() === id)

    return (
        <main className="PostPage">
            <article className="post">
                { post &&
                    <>
                        <h2>{post.title}</h2>
                        <p className="postDate">{ post.datetime }</p>
                        <p className="postBody">{post.body}</p>
                        <button onClick={() => handleDelete(post.id)}>
                            Delete Post
                        </button>
                        <Link to={`/edit/${post.id}`} >
                        <button style={{ backgroundColor: "black" }}>
                            Edit Post
                        </button>
                        </Link>
                    </>
                } {!post &&
                    <>
                        <p>Post Not Found</p>
                        <p>
                            <Link to='/' >Visite Our HomePage</Link>
                        </p>
                    </>
                }
            </article>
        </main>
    )
}

export default PostPage
