/* eslint-disable react/prop-types */
import { useParams, Link } from "react-router-dom"
import { useEffect } from "react"

const EditPost = ({
    editTitle,
    setEditTitle,
    editBody,
    setEditBody,
    posts,
    handleEdit
    }) => {

    const { id } = useParams()

    const post = posts.find((post) => (post.id).toString() === id)

    useEffect(() => {
        if (post){
            setEditTitle(post.title)
            setEditBody(post.body)
        }
    }, [post, setEditBody, setEditTitle])

    return (
        <main className="NewPost">
            { post &&
                <>
                    <h1>EditPost</h1>
                    <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            required
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <label htmlFor="body">Body:</label>
                        <textarea
                            id="body"
                            required
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)}
                        />
                        <button type="button" onClick={() => handleEdit(post.id)}>Post</button>
                    </form>
                </>
            } {!post &&
                <>
                    <p>Post Not Found</p>
                    <p>
                        <Link to='/' >Visite Our HomePage</Link>
                    </p>
                </>
            }
        </main>
    )
}

export default EditPost
