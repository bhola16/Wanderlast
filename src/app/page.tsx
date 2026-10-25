import Banner from "@/components/home/banner";
import Cta from "@/components/home/cta";
import Testimonials from "@/components/home/testimonials";
import WhyChoose from "@/components/home/why-choose";


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
