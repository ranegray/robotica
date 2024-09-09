import Footer from "../components/layout/Footer";
import NavBar from "../components/layout/NavBar";

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <main className="flex-grow overflow-hidden">{children}</main>
      <Footer />
    </>
  );
}
