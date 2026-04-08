export default function Education() {
  const education = [
    {
      degree: "Master of Science, Bioinformatics",
      school: "Northeastern University, USA",
      details:
        "Courses: Biochemistry, Molecular Biology, Programming, Database Management, Proteomics, Imaging, Ethics",
    },
    {
      degree: "Bachelor of Engineering, Biomedical Engineering",
      school: "University of Mumbai, India",
      details: "Courses: Medical Instrumentation, Anatomy, Embedded Systems, Hospital Management",
    },
    {
      degree: "MBA Certification",
      school: "Rady School of Management, UC San Diego",
      details: "Courses: Business Strategy, Innovation, Venture Creation, Leadership",
    },
  ]

  return (
    <section className="glass-section">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="typography-section-label" role="heading" aria-level={2}>
          Education
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {education.map((item, index) => (
            <div
              key={index}
              className="glass-card-surface p-6 transition-colors hover:bg-white/60 dark:hover:bg-white/[0.09]"
            >
              <p className="typography-content-title mb-2">{item.degree}</p>
              <p className="typography-meta mb-3">{item.school}</p>
              <p className="typography-body">{item.details}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
