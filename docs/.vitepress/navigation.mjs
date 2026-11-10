// One navigation model for VitePress and the documentation IA checker.
export const nav = [
  { text: 'Start', link: '/guide/', activeMatch: '^/(guide/|status)' },
  { text: 'Design', link: '/design/', activeMatch: '^/(design/|project/(system|knowledge|streaming|plugins|decisions))' },
  { text: 'Build', link: '/build/', activeMatch: '^/(build/|engineering/|reuse/|project/(roadmap|acceptance|setup|hosting))' },
  { text: 'Reference', link: '/reference/', activeMatch: '^/(reference/|architecture/|decisions/|reviews/|research/|sources|validation|course-roadmap|project/sources)' },
]
const start = [{ text: 'Start here', items: [
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
    { text: 'Dated developments', link: '/research/recent-developments' },
    { text: 'Original sources', link: '/sources' },
  ] },
]
export const sidebar = { '/': start }
for (const prefix of ['/guide/', '/status', '/project/index']) sidebar[prefix] = start
for (const prefix of ['/design/', '/project/system', '/project/knowledge', '/project/streaming', '/project/plugins', '/project/decisions']) sidebar[prefix] = design
for (const prefix of ['/build/', '/engineering/', '/reuse/', '/project/roadmap', '/project/acceptance', '/project/setup', '/project/hosting']) sidebar[prefix] = build
for (const prefix of ['/reference/', '/architecture/', '/decisions/', '/reviews/', '/research/', '/project/sources', '/sources', '/validation', '/course-roadmap']) sidebar[prefix] = reference
export const entryPages = ['guide/index.md', 'guide/vision.md', 'guide/capabilities.md', 'guide/walkthrough.md', 'design/index.md', 'build/index.md', 'reference/index.md', 'reference/glossary.md', 'reference/documentation-map.md']
