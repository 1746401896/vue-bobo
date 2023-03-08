<script>
import { ref, watch } from "vue";
import { useRouter ,useRoute} from "vue-router";
export default {
  name: "app",
  setup() {
    let transitionName = ref("");

    const router = useRouter();
    const route = useRoute();
    watch(route, (to, from) => {
      console.log(to)
      const toIndex = to.meta.index;
      const fromIndex = from.meta.index;
      // console.log("watch innier", newValue);
      transitionName = toIndex < fromIndex ? "slide-right" : "slide-left";
    });

    // const router = useRouter();
    // watch(
    //   () => router.currentRoute.value.path,
    //   (toPath) => {
    //     //要执行的方法
    //     console.log("watch innier", toPath);
    //     const query = router.currentRoute.value.query;
    //   },
    //   { immediate: true, deep: true }
    // );

    return {
      transitionName,
    };
  },
};
</script>

<template>
  <div id="app">
    <a href="/about">About</a>

    <!-- <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view> -->
    <router-view v-slot="{ Component }">
      <transition :name="transitionName">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
