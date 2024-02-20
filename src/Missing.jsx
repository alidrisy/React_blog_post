import { Link } from "react-router-dom"

const Missing = () => {
    return (
        <main className="Missing">
            <p>Page Not Found</p>
            <p>
                <Link to='/' >Visite Our HomePage</Link>
            </p>     
        </main>
    )
}

export default Missing
