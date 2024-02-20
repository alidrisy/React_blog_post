import Post from "./Post"

// eslint-disable-next-line react/prop-types
const Home = ({ posts }) => {
    return (
        <main className="Home">
            {
                // eslint-disable-next-line react/prop-types
                posts.map((post) => (
                    <Post key={post.id} post={post} />
                ))
            }
        </main>
    )
}

export default Home
