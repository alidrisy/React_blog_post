/* eslint-disable react/prop-types */
const NewPosts = ({
    postTitle,
    setPostTitle,
    postBody,
    setPostBody,
    handleSubmit}) => {
    return (
        <main className="NewPost">
             <h1>NewPost</h1>
            <form className="newPostForm" onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    required
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                />
                <label htmlFor="body">Body:</label>
                <textarea
                    id="body"
                    required
                    value={postBody}
                    onChange={(e) => setPostBody(e.target.value)}
                />
                <button type="submit">Post</button>
            </form>
        </main>
    )
}

export default NewPosts
