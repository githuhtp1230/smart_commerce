import { Facebook } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PATH } from "@/constants/path";
import { CreditCard, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <div className="w-full">
      <footer className="py-4 w-full bg-background-secondary py-1 flex justify-center px-10">
        <div className="container justify-between max-w-screen-xl w-full">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-foreground mb-4">About Mart Commerce</h3>
              <ul className="space-y-2">
                {[
                  "About Us",
                  "Careers",
                  "Corporate Responsibility",
                  "Press Center",
                  "Investor Relations",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href={PATH.CONTACT}
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-4">Stay Connected</h3>
              <ul className="space-y-2">
                {[
                  {
                    name: "Facebook",
                    icon: <Facebook className="text-blue-500 mr-2 h-4 w-4" />,
                  },
                  {
                    name: "Instagram",
                    icon: <Instagram className="text-pink-600 mr-2 h-4 w-4" />,
                  },
                  {
                    name: "YouTube",
                    icon: <Youtube className="text-red-600 mr-2 h-4 w-4" />,
                  },
                ].map((social) => (
                  <li key={social.name}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-primary flex items-center"
                    >
                      {social.icon}
                      {social.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-4">
                Customer Service
              </h3>
              <ul className="space-y-2">
                {[
                  "Help Center",
                  "Track Your Order",
                  "Returns & Exchanges",
                  "Shipping Information",
                  "Contact Us",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-4">
                Payment Methods
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  <CreditCard className="text-blue-700 h-5 w-5" />,
                  <CreditCard className="text-red-500 h-5 w-5" />,
                  <CreditCard className="text-blue-500 h-5 w-5" />,
                  <CreditCard className="text-blue-800 h-5 w-5" />,
                  <CreditCard className="text-black h-5 w-5" />,
                ].map((icon, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-background p-2 rounded border border-border"
                  >
                    {icon}
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <h3 className="font-bold text-foreground mb-4">
                  Subscribe to our Newsletter
                </h3>
                <div className="flex">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    className="rounded-r-none"
                  />
                  <Button className="bg-orange-400 hover:bg-orange-500 text-white rounded-l-none">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-border pt-6 ">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center ml-100">
              <div className="text-sm text-muted-foreground">
                © 2025 Smart Commerce. All rights reserved. |{" "}
                <a href="#" className="hover:text-primary text-sm ">
                  Privacy Policy
                </a>{" "}
                |{" "}
                <a href="#" className="hover:text-primary text-sm">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
