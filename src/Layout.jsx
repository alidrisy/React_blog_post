import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Layout = ({ search, setSearch }) => {
  return (
    <div className="App">
        <Header />
        <Nav
            search={search}
            setSearch={setSearch}
      />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout
