import Logo from "./Logo";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-4 text-center sm:flex-row">
        <Link href="/">
          <Logo />
        </Link>
        <small>{new Date().getFullYear()} Event Hub. All rights Reserved</small>
      </div>
    </footer>
  );
};

export default Footer;
