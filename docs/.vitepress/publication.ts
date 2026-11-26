// The same textbook is built under two paths. Public shares point to the edition on the author's site.
export const publication = 'https://keithwilliams.org/knowledge-lab/'

export function canonicalUrl(path: string) {
  return new URL(path.replace(/\.md$/, '').replace(/(^|\/)index$/, '$1'), publication).href
}

const covers = {
  retrieval: { section: 'Retrieval', alt: 'A red thread connects one selected card in a catalog to a landscape photograph.' },
  pipeline: { section: 'Data preparation', alt: 'A film cutter separates a landscape strip into frames ready for a blue sleeve.' },
  architecture: { section: 'System design', alt: 'Two plywood modules pull apart to reveal their blue connecting dowels.' },
  evidence: { section: 'Evidence and sources', alt: 'Red pins mark the same tower detail in photographs taken from two angles.' },
  evaluation: { section: 'Evaluation', alt: 'Four prints of one leaf are compared against a tonal scale on a light box.' },
  operations: { section: 'Building and operating', alt: 'A red spike rises on a paper strip beneath two analog monitoring gauges.' },
  reference: { section: 'Field reference', alt: 'A pencil marks an open field manual with blue, ivory and red index tabs.' }
}
type Topic = keyof typeof covers

const byPage: Record<string, Topic> = {
  'index': 'retrieval', 'students/index': 'retrieval', 'students/plan': 'retrieval',
  'students/reference': 'retrieval', 'students/build': 'pipeline', 'students/chunking': 'pipeline',
  'students/embeddings': 'retrieval', 'students/data-choices': 'architecture',
  'students/from-app-studio': 'operations', 'students/check': 'evaluation', 'students/stuck': 'evaluation',
  'students/prompts': 'reference', 'students/library-survey': 'reference', 'students/ai-costs': 'reference',
  'architecture/retrieval': 'retrieval', 'architecture/ingestion': 'pipeline', 'guide/walkthrough': 'evidence',
  'guide/vision': 'evidence', 'project/knowledge': 'evidence', 'project/sources': 'evidence',
  'project/acceptance': 'evaluation', 'project/hosting': 'operations', 'project/setup': 'operations',
  'project/roadmap': 'operations', 'project/streaming': 'pipeline', 'reference/browser-review': 'evaluation',
  'research/implementation-resources': 'reference', 'research/concepts': 'architecture',
  'reuse/source-audit': 'evidence', 'reuse/harvest-plan': 'pipeline', 'validation': 'evaluation',
  'status': 'operations', 'sources': 'evidence', 'course-roadmap': 'reference'
}
const bySection: Record<string, Topic> = {
  architecture: 'architecture', build: 'operations', decisions: 'architecture', design: 'architecture',
  engineering: 'operations', guide: 'retrieval', project: 'architecture', reference: 'reference',
  research: 'evidence', reuse: 'operations', reviews: 'evaluation', students: 'retrieval'
}

export function editorialImage(path: string) {
  const slug = path.replace(/\.md$/, '')
  const topic = byPage[slug] || bySection[slug.split('/')[0]] || 'reference'
  return { ...covers[topic], path: 'images/field-guide/' + topic + '.jpg', width: 1200, height: 630 }
}
