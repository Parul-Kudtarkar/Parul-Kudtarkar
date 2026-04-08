import Header from "@/components/header"
import Hero from "@/components/hero"
import WorkExperience from "@/components/work-experience"
import HomeBlogPreview from "@/components/home-blog-preview"
import Education from "@/components/education"
import ReviewingExperience from "@/components/reviewing-experience"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent">
      <Header />
      <Hero />
      <WorkExperience />
      <HomeBlogPreview />
      <Education />
      <ReviewingExperience />
      <Footer />
    </main>
  )
}
