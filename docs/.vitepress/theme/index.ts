import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import ArchitectureMap from './components/ArchitectureMap.vue'
import ReviewLayout from './components/ReviewLayout.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: ReviewLayout,
  enhanceApp({ app }) { app.component('ArchitectureMap', ArchitectureMap) },
} satisfies Theme
