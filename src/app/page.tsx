import Banner from "@/components/home/banner";
import Cta from "@/components/home/cta";
import FeaturedPage from "@/components/home/featured";
import Testimonials from "@/components/home/testimonials";
import WhyChoose from "@/components/home/why-choose";

export const dynamic = "force-dynamic";
export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Banner />
      <FeaturedPage/>
      <WhyChoose />
      <Testimonials />
      <Cta />
    </div>
  );
}
