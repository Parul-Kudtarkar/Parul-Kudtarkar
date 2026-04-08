"use client"

import { useEffect, useState } from "react"

export default function WorkExperience() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const experience = [
    {
      title: "Common Metabolic Diseases Genome Atlas & PanKbase",
      dates: "June 2017 – Present",
      description: `Principal architect for cmdga.org ($57M FNIH AMP CMD initiative) and PanKbase (data.pankbase.org, $10M NIH-funded), partnering with Amgen, Eli Lilly, Novo Nordisk, and Pfizer. Executed single-cell ATAC-seq analyses identifying disease-associated chromatin patterns for T1D and T2D. Architected scalable cloud solutions reducing costs while improving performance. Developed PerseusAI platform integrating knowledge graphs, vector embeddings and LLMs.`,
    },
    {
      title: "Echinobase",
      dates: "January 2011 – June 2017",
      description: `Built Echinobase and end-to-end sequence analysis for 7 echinoderm species. Built a comparative genomics platform serving 150+ labs worldwide. Integrated RNA-seq and ATAC-seq to infer transcriptional networks across 7 echinoderm species.`,
    },
    {
      title: "Cloud Computing for Comparative Genomics",
      dates: "January 2008 – December 2010",
      description: `Deployed distributed RSD algorithm on cloud platforms (Yahoo MapReduce, AWS ECS). Applied machine learning-based runtime prediction achieving 40% cost reduction, pioneering the first cloud-based comparative genomics system.`,
    },
  ]

  return (
    <section className="glass-section">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="typography-section-label" role="heading" aria-level={2}>
            Work Experience
          </p>
        </div>

        <div className="space-y-6">
          {experience.map((item, index) => (
            <div
              key={index}
              className={`pb-6 border-b border-[#d2d2d7] last:border-b-0 last:pb-0 transition-all duration-700 dark:border-[#424245] ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{
                transitionDelay: isVisible ? `${(index + 1) * 100}ms` : "0ms",
              }}
            >
              <p className="typography-content-title mb-3 max-w-3xl">{item.title}</p>
              <p className="typography-meta mb-4">{item.dates}</p>
              <p className="typography-body max-w-3xl">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
