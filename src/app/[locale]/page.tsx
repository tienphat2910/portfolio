import Hero from "../../components/Hero";
import About from "../../components/About";
import Projects from "../../components/Projects";
import Contact from "../../components/Contact";
import Footer from "../../components/Footer";
import { getPortfolioData } from "../../lib/supabase/service";

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const data = await getPortfolioData(locale);

  return (
    <>
      <main className="pt-16 relative">
        <Hero profile={data.profile} />
        <About
          profile={data.profile}
          skills={data.skills}
          experiences={data.experiences}
          education={data.education}
        />
        <Projects projects={data.projects} />
        <Contact profile={data.profile} />
      </main>
      <Footer />
    </>
  );
}
