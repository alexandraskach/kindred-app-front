import Link from "next/link";

export function Layout({ children }) {
  return (
    <div>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/about/me">
          <a>About Me</a>
        </Link>
        <Link href="/post/1234">
          <a>Post 1234</a>
        </Link>
        <Link href="/tags">
          <a>Tags</a>
        </Link>
      </nav>
      <main>{children}</main>
    </div>
  );
}
