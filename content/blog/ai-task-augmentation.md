Let's be honest about what's happening. People are scared. Not because they've read too many dystopian headlines but because they can see with their own eyes what these tools can do. They've watched colleagues automate tasks that used to take hours. They've seen job postings quietly disappear. They've used Claude or ChatGPT to do something they used to get paid for and felt something complicated about it.

The fear is real. What's been missing is clarity. Most of what passes for analysis on this topic is either catastrophizing or hand-waving. Very little is built on what AI is actually doing right now, in the actual tasks of actual jobs. That's what I set out to find.

Anthropic just published some of the most rigorous data we have on this. I decided to go deeper.

I took their findings as a starting point, then ran my own analysis: 176 real job descriptions from active postings across big pharma (Eli Lilly, Novartis, AbbVie), biotech startups, health tech (AWS Healthcare, Tempus, Flatiron), academic research institutions (Broad Institute, Chan Zuckerberg Initiative, Memorial Sloan Kettering, Cold Spring Harbor Laboratory), government labs (NIH, FDA, CDC, Argonne, Lawrence Berkeley National Laboratory) and AI platforms (Meta FAIR, Mistral, Databricks). Every task scored for automation risk, strategic moat and AI augmentation potential using the Claude API and the U.S. Department of Labor's O*NET task framework.

The 176-job analysis was fully automated, that's the point of building the pipeline. But automation has limits when the subject is you. So I did something different with my own role: I ran it in detail, with real context, the way you can't do at scale. It surfaced things the aggregate analysis misses. It changed how I think about where I invest my time. That personal analysis deserves its own post and I'll write it. For now, I've included a preview of what I found and a template so you can do the same.

## Part 1: What Anthropic's own data actually says

In February 2025, Anthropic launched the **Economic Index**, the first large-scale dataset built from how AI is actually being used, not how people say they use it. They analyzed approximately one million anonymized conversations with Claude, matched each to O*NET occupational tasks and tracked whether the usage was **automative** (AI doing the task) or **augmentative** (AI helping a human do the task).

In March 2026, they published a follow-up paper introducing a new measure called **observed exposure**, designed to capture not just what AI *could* theoretically do but what it is *actually doing* in professional settings. This distinction matters enormously.

### The headline numbers

<<<SLOT:headline-numbers-table>>>

Read those carefully. Only **4% of jobs** use AI across three-quarters of their tasks. The apocalyptic "AI takes everything" scenario is not what the data shows, at least not yet.

### The key insight Anthropic's data reveals

> *"AI currently covers just 33% of tasks in Computer & Math roles, despite 94% theoretical exposure. The gap between what AI could do and what it's actually doing is where the story lives."*

Anthropic's March 2026 paper introduces the concept of the **gap between theoretical capability and observed exposure**. For Computer & Math occupations, theoretical coverage is 94%. Observed exposure is 33%. That 61-point gap represents tasks that are theoretically automatable but haven't been automated yet, due to model limitations, legal constraints, workflow friction or simply slow adoption.

For life sciences professionals, this gap is even larger. And the reason isn't just technical, it's moral. When your work sits anywhere near a patient outcome, a drug approval or a clinical trial endpoint, the stakes are categorically different from most knowledge work. Getting it wrong doesn't mean a bad quarter. It means harm to real people. That reality imposes a standard of rigor that AI, for all its capability, has not yet earned in high-stakes biological contexts. Add to that the genuine complexity of biology itself: living systems are noisy, context-dependent and full of edge cases that don't appear in training data and the biological validation, regulatory accountability and experimental judgment layers act as natural friction that slows automation penetration even when the underlying capability exists. This isn't resistance to change. It's what careful looks like.

That said, the upside of getting this right is almost incomprehensible. AI and human scientists working together, carefully, with the right guardrails, have a realistic shot at compressing decades of drug discovery into years. Diseases that have resisted treatment for generations are now in play. The same partnership that demands caution today is the one that could, within our lifetimes, make some of the oldest words in medicine, *"there is no cure"*, obsolete.

One more finding worth noting: occupations with higher observed exposure are projected by the BLS to **grow less through 2034**. Not shrink, grow less. And among currently employed workers, Anthropic finds no systematic increase in unemployment in highly exposed roles yet. The effects are emerging, not yet arrived.

## Part 2: I ran my own analysis on 176 job descriptions

Anthropic's data is powerful but aggregate. It tells you that Life Sciences is 6.4% of Claude usage. It doesn't tell you whether a bioinformatics scientist at Genentech faces different AI risk than one at the Broad Institute (what I call the **moat profile**: the combination of factors that make a role's work difficult for AI to replicate), or whether a Senior ML Scientist at Recursion has a different moat profile than the same title at NVIDIA.

So I built a pipeline to find out.

### The methodology

I used three data sources to automatically collect **176 real, active job descriptions** from specific named companies and institutions:

- **Big Pharma:** Genentech, Pfizer, Novartis, AstraZeneca, Merck, Bristol Myers Squibb, Eli Lilly
- **Biotech Startups:** Recursion, Insitro, Relay Therapeutics, Schrödinger, 10x Genomics, Moderna, Ginkgo Bioworks
- **Health Tech:** NVIDIA, AWS, Google Health, Tempus, Flatiron, PathAI, Guardant Health, Grail
- **Research Institutes:** Broad Institute, Chan Zuckerberg Initiative, Arc Institute, Allen Institute, Jackson Laboratory, Dana-Farber

<<<SLOT:methodology-callout>>>

Methodology note: All scores are directional model estimates based on Claude API and the O*NET task framework. Not deterministic predictions. Full framework in the free template at the end. Code releasing on GitHub next week. Treat all scores as directional, not authoritative.

### Headline findings across all 176 jobs

<<<SLOT:headline-stats>>>

The headline that matters most: **62% of tasks in life sciences roles remain firmly human-led.** This is not the story the headlines tell. The automation layer is real, but it's concentrated, not pervasive.

### Finding 1: The sector you work in matters as much as your title

> *Same role. Same degree. Completely different moat profile. The institution shapes the risk as much as the job itself.*

<<<SLOT:sector-dashboard>>>

Biotech startups show the strongest protection against automation (68.6% human-led), not because the science is simpler, but because the pace of early-stage discovery demands constant novel judgment. Every experiment is a hypothesis test. Every result is an ambiguous signal. That ambiguity is exactly what AI cannot resolve.

### Finding 2: These tasks are going first, everywhere

Across all sectors, the highest automation risk tasks were consistent. From the analysis:

- **Standard reporting and communications:** highest augmentation potential (80/100), first automation target
- **Literature review and biomarker synthesis:** consistently flagged across every sector (aug potential: 75/100)
- **Code generation and debugging:** significant automation exposure (75/100 aug potential)
- **NGS QC and preprocessing pipelines:** high automation risk (70/100 aug potential)
- **Scientific writing (first drafts):** strong augmentation case across all role families

These tasks appear in virtually every role. They also consume a disproportionate share of a typical bioinformatician's week. If you're spending more than 30% of your time here, that's your most urgent productivity signal, not because your job is at risk, but because the people who automate this layer first will have nearly **14 hours per week** freed for the work that actually builds careers.

### Finding 3: The strongest moat sits in your most specialized technical work

The highest-moat tasks across the 176-job dataset were the most technically specialized: LLM and knowledge graph development where biological domain expertise is baked into the architecture (moat 8/10), cloud architecture for biological data at scale (moat 8/10) and ML model development requiring biological validation (moat 7/10). The moat isn't about being human. It's about being specifically and deeply expert at the intersection of AI/ML systems and biological data.

### The Risk × Moat quadrant

Every task maps to one of four quadrants:

<<<SLOT:risk-moat-quadrant>>>

## Part 3: I ran this on my own job. Here's what I found.

Analysis of other people's roles is useful. Analysis of your own role is career-changing.

I'm a **Bioinformatics Programmer at the University of California San Diego**, Pediatrics department. My work spans enterprise-scale platform development, AI-powered drug discovery tooling, deploying ML methods on health data and large-scale genomics, primarily focused on diabetes and metabolic disease.

I build the infrastructure other computational biologists use to do science. That makes the analysis of my own role particularly interesting and a little uncomfortable.

### My task breakdown

From the analysis of my own role:

<<<SLOT:personal-task-dashboard>>>

**What surprised me:** Reporting and communications is my only fully automatable task and it's where I spend a meaningful chunk of time. The rest of my work sits firmly in the augment or human-led zones. The biological domain expertise baked into my ML and LLM development work is what makes it hard to automate, not the technical skills alone.

**Where my moat is strongest:** LLM/RAG/knowledge graph development and cloud architecture for biological data. Both score 8/10 on strategic moat. Both require the combination of AI/ML fluency *and* deep domain knowledge of diabetes biology that is genuinely rare.

*That personal analysis deserves its own post and I'll write it in detail. What follows is a template so you don't have to wait.*

## Part 4: A template for anyone, from plumbers to software engineers

The Risk × Moat framework is not specific to life sciences. It applies to any role, in any field.

### First: understand where your occupation sits

<<<SLOT:occupation-risk-table>>>

### The 4-step framework anyone can apply

<<<SLOT:framework-step-cards>>>

### The question that matters most

> *The workers most at risk are not the ones who don't use AI. They're the ones whose entire value proposition sits in the automation zone, with no moat below it.*

For any role, in any industry, the question is the same: **if AI handles the bottom 30-40% of your tasks, what does the rest of your work look like?**

For a **plumber**: the physical skill and field judgment cannot be replicated. The administrative layer is easily automated to free up more billable time. Net positive.

For a **software engineer**: the code generation layer is real and growing. The answer is not to out-code the model: it's to develop the architecture judgment, product instinct and cross-functional influence that makes you the person who directs the model.

For a **bioinformatician**: hiring for ease is going. Hiring for capability will be rampant. The career investment is clear.

## What you should do this week

<<<SLOT:weekly-checklist>>>

The template is already out there: use it however it's useful to you. What I'd love to build from here is something the template can't generate on its own: a real picture of how people across this field are actually thinking about their work and where AI is changing it. If you run it on your own role and find something unexpected, drop a comment below.

And if this changed how you think about your role: share it with one person on your team. The conversation needs more data and fewer predictions.

## Methodology note

**Part 1 sources:** Anthropic Economic Index (February 2025, arxiv.org/abs/2503.04761) and Anthropic Labor Market Impacts paper (March 5, 2026, anthropic.com/research/labor-market-impacts). All Anthropic statistics cited directly from these primary sources.

**Part 2 methodology:** Analysis conducted March 2026 using O*NET occupational task data and the Claude API (claude-sonnet-4-20250514). 176 job descriptions from active postings across big pharma, biotech startups, health tech, academic research institutions and government labs, targeting 40+ named companies and institutions. All automation risk, strategic moat and augmentation potential scores are model-generated directional estimates, not deterministic predictions.

**Part 4:** Risk assessments for non-life-sciences occupations are based on Anthropic Economic Index data, Eloundou et al. (2023) GPT-4 exposure estimates and the O*NET task database. General directional assessments, not individual role analyses.
