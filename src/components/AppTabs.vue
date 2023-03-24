<template>
  <div class="tabs" v-if="tabs">
    <nav class="tabs__nav">
      <RouterLink
        v-for="tab in tabs"
        :key="tab.name"
        class="tabs__nav-item"
        :to="{ name: tab.name }"
      >
        <span class="tabs__nav-icon material-symbols-outlined" v-if="tab.meta?.tabIcon">{{
          tab.meta.tabIcon
        }}</span>
        <span class="tabs__nav-label" v-if="tab.meta?.tabLabel">{{ tab.meta.tabLabel }}</span>
      </RouterLink>
    </nav>
    <div class="tabs__wrapper">
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component"></component>
        </Transition>
      </RouterView>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, type ComputedRef } from 'vue'
import { useRouter, RouterView, type RouteRecordRaw } from 'vue-router'

// Use children routes for the tabs
const router = useRouter()
const tabs: ComputedRef<RouteRecordRaw[] | undefined> = computed(() => {
  const currentRoute = router.currentRoute.value.name
  return router.options.routes?.find(
    (route) =>
      route.name === currentRoute || route.children?.find((child) => child.name === currentRoute)
  )?.children
})
</script>

<style>
.tabs {
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
}
.tabs__wrapper {
  padding: 1.5rem 2rem 2rem 2rem;
}
.tabs__nav {
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
.tabs__nav-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
  text-decoration: none;
  padding: 1rem;
  border-bottom: 3px solid transparent;
  margin-bottom: -1px;
  color: rgba(0, 0, 0, 0.87);
  transition: border-color 0.25s ease-in-out;
}
.tabs__nav-icon {
  margin-right: 0.5rem;
  color: rgba(0, 0, 0, 0.38);
}
.tabs__nav-item:hover {
  border-color: #ccc;
}
.tabs__nav-item.router-link-exact-active {
  border-color: var(--green);
  font-weight: 600;
}
</style>
