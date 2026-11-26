import DefaultTheme from 'vitepress/theme-without-fonts'
import type { Theme } from 'vitepress'
import ArchitectureMap from './components/ArchitectureMap.vue'
import LabScroll from './components/LabScroll.vue'
import LabArticleHeader from './components/LabArticleHeader.vue'
import JournalLink from './components/JournalLink.vue'
import ReviewLayout from './components/ReviewLayout.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: ReviewLayout,
  enhanceApp({ app }) {
    app.component('ArchitectureMap', ArchitectureMap)
    app.component('LabArticleHeader', LabArticleHeader)
    app.component('LabScroll', LabScroll)
    app.component('JournalLink', JournalLink)
  },
} satisfies Theme
