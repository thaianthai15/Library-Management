import { FaShippingFast, FaShieldAlt, FaHeadset, FaTag } from "react-icons/fa";
import FeatureItem from "./FeatureItem";

export default function FeatureBar() {
  const features = [
    { icon: FaShippingFast, title: "Return & Refund", desc: "Money back guarantee" },
    { icon: FaShieldAlt, title: "Secure Payment", desc: "30% off by subscribing" },
    { icon: FaHeadset, title: "Quality Support", desc: "Always online 24/7" },
    { icon: FaTag, title: "Daily Offers", desc: "20% off by subscribing" },
  ];

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="bg-[#d0e1e7] rounded-xl flex items-center justify-between p-2 shadow-sm">
        {features.map((item, index) => (
          <FeatureItem
            key={index}
            icon={item.icon}
            title={item.title}
            description={item.desc}
            isLast={index === features.length - 1}
          />
        ))}
      </div>
    </div>
  );
}