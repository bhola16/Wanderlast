import Banner from "@/components/banner";
import Cta from "@/components/cta";
import Testimonials from "@/components/testimonials";
import WhyChoose from "@/components/why-choose";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Banner />
      <WhyChoose />
      <Testimonials />
      <Cta />
    </div>
  );
}
