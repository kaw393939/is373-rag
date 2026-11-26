<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { publication } from '../../publication'

const props = withDefaults(defineProps<{ to?: string }>(), { to: '/' })
const { site } = useData()
const edition = new URL(publication)
const href = computed(() => site.value.base === edition.pathname
  ? props.to
  : new URL(props.to, edition.origin).href)
</script>

<template>
  <!-- The journal has its own router, even when both sites share an origin. -->
  <a :href="href" target="_self"><slot /></a>
</template>
