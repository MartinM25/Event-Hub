import { footerLinks, socialLinks } from "@/constants";
import { Separator } from "../ui/separator";
import Newsletter from "./Newsletter";
import Logo from "./Logo";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="px-10 py-10 bg-secondary lg:px-20">
      <div className="flex flex-col gap-y-2 lg:flex-row md:gap-x-4 justify-between">
        {/* first column */}
        <section className="justify-center md:justify-start">
          <div className="mx-auto">
            <p className="text-center lg:text-left">
              Stay up to date on the latest features and releases by joining our
              newsletter.
            </p>
            <div className="py-6">
              <Newsletter />
            </div>
            <p className="text-center text-xs lg:text-left">
              By subscribing, you agree to our Privacy Policy and consent to
              receive updates from our company
            </p>
          </div>
        </section>

        {/* second column */}
        <section className="flex flex-col justify-center lg:justify-between lg:text-left">
          <div className="py-6 lg:py-0 lg:pb-6">
            <p className="text-xl pb-2 font-semibold text-center lg:text-left">
              Quick Links
            </p>
            <ul className="flex flex-row gap-6 items-center justify-center lg:justify-start">
              {footerLinks.map((link) => (
                <li
                  key={link.route}
                  className="flex flex-row gap-6 hover:underline"
                >
                  <Link href={link.route}>
                    <small>{link.label}</small>
                  </Link>
                  <Separator orientation="vertical" className="h-5" />
                </li>
              ))}
            </ul>
          </div>
          <div className="gap-x-6">
            <p className="text-xl pb-3 font-semibold text-center lg:text-left">
              Follow Us
            </p>
            <ul className="flex mx-auto gap-x-5 justify-center lg:justify-start">
              {socialLinks.map((social) => (
                <li
                  key={social.link}
                  className="flex items-center justify-center h-12 w-12 rounded-full bg-primary"
                >
                  <Link href={social.link}>
                    <social.icon className="h-6 w-6 text-white hover:text-zinc-300 duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <Separator className="my-6" />

      <div className="flex flex-col md:flex-row text-center items-center justify-between">
        <small className="">
          {new Date().getFullYear()} Event Hub. All rights Reserved
        </small>
        <div className="text-center">
          <Link href="/" className="inline-block">
            <Logo />
          </Link>
        </div>
        <small>Designed & Developed by Martin Manjoro</small>
      </div>
    </footer>
  );
};

export default Footer;
