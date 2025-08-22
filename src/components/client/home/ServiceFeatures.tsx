import { Truck, ShieldCheck, BadgeCheck, Wrench } from "lucide-react";
import { useTranslation } from "react-i18next";



const ServiceFeatures = () => {
    const { t } = useTranslation();
    const features = [

        {
            id: 1,
            icon: <Truck className="w-10 h-10 text-txt-primary-blue" />,
            title: t("ServiceFeature.express_delivery"),
            desc: t("ServiceFeature.ship_cod"),
        },
        {
            id: 2,
            icon: <ShieldCheck className="w-10 h-10 text-txt-primary-blue" />,
            title: t("ServiceFeature.best_warranty"),
            desc: t("ServiceFeature.best_quality"),
        },
        {
            id: 3,
            icon: <BadgeCheck className="w-10 h-10 text-txt-primary-blue" />,
            title: t("ServiceFeature.genuine_commitment"),
            desc: t("ServiceFeature.international_version"),
        },
        {
            id: 4,
            icon: <Wrench className="w-10 h-10 text-txt-primary-blue" />,
            title: t("ServiceFeature.lifetime_support"),
            desc: t("ServiceFeature.free_support"),
        },
    ];
    return (
        <div className="w-full bg-background-primary py-6 mt-20">
            <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                {features.map((f) => (
                    <div key={f.id} className="flex flex-col items-center">
                        {f.icon}
                        <h3 className="font-bold text-txt-primary mt-2">{f.title}</h3>
                        <p className="text-sm text-txt-tertiary">{f.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServiceFeatures;
