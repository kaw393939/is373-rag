// One navigation model for VitePress and the documentation IA checker.
const students = [{ text: 'IS373 · current assignment', items: [
  { text: 'Student RAG guide', link: '/students/' },
  { text: 'Plan a small RAG', link: '/students/plan' },
  { text: 'Build one complete path', link: '/students/build' },
  { text: 'From FastAPI to hosted RAG', link: '/students/from-app-studio' },
  { text: 'Survey RAG and AI libraries', link: '/students/library-survey' },
  { text: 'Databases and retrieval', link: '/students/data-choices' },
  { text: 'Embeddings and similarity', link: '/students/embeddings' },
  { text: 'Chunking and source boundaries', link: '/students/chunking' },
  { text: 'AI models and budgets', link: '/students/ai-costs' },
  { text: 'AI coding prompts', link: '/students/prompts' },
  { text: 'Troubleshooting', link: '/students/stuck' },
  { text: 'Evaluation and peer review', link: '/students/check' },
  { text: 'Optional local lab', link: '/students/reference' },
] }]
const researchOverview = [{ text: 'Research overview', items: [
  { text: 'Overview', link: '/guide/' },
  { text: 'Project vision', link: '/guide/vision' },
  { text: 'Capabilities', link: '/guide/capabilities' },
  { text: 'A research walkthrough', link: '/guide/walkthrough' },
  { text: 'Status and evidence', link: '/status' },
] }]
const design = [{ text: 'System design', items: [
  { text: 'Design overview', link: '/design/' },
  { text: 'Modules and boundaries', link: '/project/system' },
  { text: 'Knowledge and identity', link: '/project/knowledge' },
  { text: 'Streaming interface', link: '/project/streaming' },
  { text: 'Workers and durable jobs', link: '/project/plugins' },
  { text: 'Decision register', link: '/project/decisions' },
] }]
const build = [
  { text: 'Build the system', items: [
    { text: 'Build guide', link: '/build/' },
    { text: 'Delivery roadmap', link: '/project/roadmap' },
    { text: 'Requirements and acceptance', link: '/project/acceptance' },
    { text: 'Reuse map', link: '/reuse/' },
    { text: 'Pinned source audit', link: '/reuse/source-audit' },
    { text: 'Extraction plan', link: '/reuse/harvest-plan' },
  ] },
  { text: 'Verify and operate', items: [
    { text: 'Twelve-factor matrix', link: '/engineering/twelve-factor' },
    { text: 'Clean builds and releases', link: '/engineering/clean-build' },
    { text: 'Executable examples', link: '/engineering/examples' },
    { text: 'Local docs and Pages', link: '/project/setup' },
    { text: 'Application hosting', link: '/project/hosting' },
  ] },
]
const reference = [
  { text: 'Reference', items: [
    { text: 'Reference library', link: '/reference/' },
    { text: 'Glossary', link: '/reference/glossary' },
    { text: 'Source map', link: '/project/sources' },
    { text: 'Documentation map', link: '/reference/documentation-map' },
  ] },
  { text: 'Earlier architecture', collapsed: true, items: [
    { text: 'Overview', link: '/architecture/overview' },
    { text: 'Frontend', link: '/architecture/frontend' },
    { text: 'Backend', link: '/architecture/backend' },
    { text: 'Retrieval', link: '/architecture/retrieval' },
    { text: 'Ingestion', link: '/architecture/ingestion' },
    { text: 'Contracts', link: '/architecture/contracts' },
    { text: 'Original decisions', link: '/decisions/' },
    { text: 'Serving boundaries', link: '/decisions/001-serving-boundaries' },
    { text: 'Retrieval storage', link: '/decisions/002-retrieval-storage' },
    { text: 'Workflow ownership', link: '/decisions/003-workflow-ownership' },
    { text: 'Original validation', link: '/validation' },
    { text: 'Course planning', link: '/course-roadmap' },
  ] },
  { text: 'Reviews and research', collapsed: true, items: [
    { text: 'Review findings', link: '/reviews/' },
    { text: 'Clean architecture', link: '/reviews/clean-architecture' },
    { text: 'Design patterns', link: '/reviews/design-patterns' },
    { text: 'Rust design', link: '/reviews/rust-design' },
    { text: 'Research hub', link: '/research/' },
    { text: 'Similar projects', link: '/research/similar-projects' },
    { text: 'Implementation resources', link: '/research/implementation-resources' },
    { text: 'Concept guide', link: '/research/concepts' },
    { text: 'Research developments', link: '/research/recent-developments' },
    { text: 'Original sources', link: '/sources' },
  ] },
]
// Prefixes with a trailing slash own a directory. Other entries own one page.
const sections = [
  { text: 'Students', link: '/students/', groups: students, prefixes: ['/students/'] },
  { text: 'Research overview', link: '/guide/', groups: researchOverview, prefixes: ['/guide/', '/status', '/project/index'] },
  { text: 'Design', link: '/design/', groups: design, prefixes: ['/design/', '/project/system', '/project/knowledge', '/project/streaming', '/project/plugins', '/project/decisions'] },
  { text: 'Build', link: '/build/', groups: build, prefixes: ['/build/', '/engineering/', '/reuse/', '/project/roadmap', '/project/acceptance', '/project/setup', '/project/hosting'] },
  { text: 'Reference', link: '/reference/', groups: reference, prefixes: ['/reference/', '/architecture/', '/decisions/', '/reviews/', '/research/', '/project/sources', '/sources', '/validation', '/course-roadmap'] }
]

export const sidebar = Object.fromEntries(
  sections.flatMap(({ prefixes, groups }) => prefixes.map(prefix => [prefix, groups]))
)
// On a matching depth VitePress visits entries in insertion order. Keep the fallback last.
sidebar['/'] = students

export const nav = sections.map(({ text, link, prefixes }) => {
  // VitePress removes the "index" suffix before checking an active navigation link.
  const alternatives = prefixes.map(prefix => prefix.endsWith('/') ? prefix : prefix.replace(/\/index$/, '/') + '$')
  return { text, link, activeMatch: '^(?:' + alternatives.join('|') + ')' }
})
export const entryPages = ['students/index.md', 'guide/index.md', 'guide/vision.md', 'guide/capabilities.md', 'guide/walkthrough.md', 'design/index.md', 'build/index.md', 'reference/index.md', 'reference/glossary.md', 'reference/documentation-map.md']
