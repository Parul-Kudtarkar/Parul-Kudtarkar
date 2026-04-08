export default function ReviewingExperience() {
  const reviewing = [
    {
      title: "Editorial Board",
      content: "Database: The Journal of Biological Databases and Curation",
    },
    {
      title: "Journals Reviewed For",
      content:
        "American Journal of Human Genetics, Bioinformatics, Evolutionary Bioinformatics, BMC Bioinformatics, PLOS Computational Biology, Journal of Endocrinology, Faculty of 1000, Diabetes",
    },
    {
      title: "Conference Jury",
      content: "Intel International Science and Engineering Fair (Computational Biology and Bioinformatics category), Chen Institute Symposium for AI Accelerated Science",
    },
  ]

  return (
    <section className="glass-section">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="typography-section-label" role="heading" aria-level={2}>
          Reviewing Experience
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviewing.map((item, index) => (
            <div
              key={index}
              className="glass-card-surface p-6 transition-colors hover:bg-white/60 dark:hover:bg-white/[0.09]"
            >
              <p className="typography-content-title mb-3">{item.title}</p>
              <p className="typography-body">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
