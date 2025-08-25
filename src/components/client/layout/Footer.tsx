import { Facebook } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PATH } from "@/constants/path";
import { CreditCard, Instagram, Youtube } from "lucide-react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full">
      <footer className="py-4 w-full bg-background-secondary py-1 flex justify-center px-10">
        <div className="container justify-between max-w-screen-xl w-full">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* About */}
            <div>
              <h3 className="font-bold text-foreground mb-4">
                {t("footer.about.title")}
              </h3>
              <ul className="space-y-2">
                {t("footer.about.items", { returnObjects: true }).map(
                  (item: string) => (
                    <li key={item}>
                      <a
                        href={PATH.CONTACT}
                        className="text-sm text-muted-foreground hover:text-primary"
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Social */}
            <div>
              <h3 className="font-bold text-foreground mb-4">
                {t("footer.social.title")}
              </h3>
              <ul className="space-y-2">
                {[
                  {
                    name: t("footer.social.facebook"),
                    icon: <Facebook className="text-blue-500 mr-2 h-4 w-4" />,
                  },
                  {
                    name: t("footer.social.instagram"),
                    icon: <Instagram className="text-pink-600 mr-2 h-4 w-4" />,
                  },
                  {
                    name: t("footer.social.youtube"),
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

            {/* Customer Service */}
            <div>
              <h3 className="font-bold text-foreground mb-4">
                {t("footer.customer.title")}
              </h3>
              <ul className="space-y-2">
                {t("footer.customer.items", { returnObjects: true }).map(
                  (item: string) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-sm text-muted-foreground hover:text-primary"
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Payment + Newsletter */}
            <div>
              <h3 className="font-bold text-foreground mb-4">
                {t("footer.payment")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-background p-2 rounded border border-border"
                  >
                    <CreditCard className="text-blue-700 h-5 w-5" />
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <h3 className="font-bold text-foreground mb-4">
                  {t("footer.newsletter.title")}
                </h3>
                <div className="flex">
                  <Input
                    type="email"
                    placeholder={t("footer.newsletter.placeholder")}
                    className="rounded-r-none"
                  />
                  <Button className="bg-orange-400 hover:bg-orange-500 text-white rounded-l-none">
                    {t("footer.newsletter.button")}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-border pt-6 ">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center ml-100">
              <div className="text-sm text-muted-foreground">
                © 2025 Smart Commerce. {t("footer.bottom.rights")} |{" "}
                <a href="#" className="hover:text-primary text-sm ">
                  {t("footer.bottom.privacy")}
                </a>{" "}
                |{" "}
                <a href="#" className="hover:text-primary text-sm">
                  {t("footer.bottom.terms")}
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
