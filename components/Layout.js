import Link from "next/link";
import ArrowLeftIcon from "./icons/ArrowLeftIcon";
import Header from "./Header";
import Nav from "./Nav";

export function Layout({ children }) {
  return (
    <>
      {/* header */}
      <Header/>
      <Nav/>
      <main id="Page">{children}</main>
    </>
  );
}
