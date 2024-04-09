import { footerLinks, socialLinks } from "@/constants";
import { Separator } from "../ui/separator"
import Logo from "./Logo";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t lg:px-20 pl-10 py-2">
      <div className="text-center py-4">
        <Link href="/" className="inline-block">
          <Logo />
        </Link>
        <small className="block py-2">{new Date().getFullYear()} Event Hub. All rights Reserved</small>
        {/* FOOTER NAV ITEMS */}
        <ul className="flex flex-row gap-6 items-center justify-center">
          {footerLinks.map((link) => {
            return (
              <li key={link.route} className="flex flex-row items-center gap-6 hover:underline">
                <Link href={link.route}>
                  <small>{link.label}</small> 
                </Link>
                <Separator orientation="vertical" className="h-5"/>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="flex items-center justify-center gap-x-6">
        <Separator className="w-[200px] hidden md:block"/>
        <ul className="flex items-center gap-x-5">
          {socialLinks.map((social) => (
            <li key={social.link}>
              <Link href={social.link}>
                <social.icon className="h-7 w-7 hover:text-primary duration-300" />
              </Link>
            </li>
          ))}
        </ul>
        <Separator className="w-[200px] hidden md:block"/>
      </div>
    </footer>
  );
};

export default Footer;
