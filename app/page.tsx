import { Contact7 } from "@/components/contact7";
import { Footer2 } from "@/components/footer2";
import { Gallery6 } from "@/components/gallery6";
import { Hero7 } from "@/components/hero7";
import { InfoCard } from "@/components/InfoCard";
import { Navbar1 } from "@/components/navbar1";

export default function Home() {
  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64">
      <Navbar1 />
      <Hero7 />
      <Gallery6 />
      <InfoCard />
      <Contact7 />
      <Footer2 />
    </div>
  );
}
