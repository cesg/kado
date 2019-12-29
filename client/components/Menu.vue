<template>
  <aside class="menu">
    <p class="menu-label">
      HOME
    </p>
    <ul class="menu-list">
      <li>
        <router-link :to="{name: 'home.assigned'}">
          <span>Assigned</span>
        </router-link>
      </li>
    </ul>
    <p class="menu-label">
      KANBANS
    </p>
    <ul class="menu-list">
      <li>
        <router-link :to="{name: 'kanbans.backlog'}">
          <span>Backlog</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{name: 'kanbans.develop'}">
          <span>Develop</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{name: 'kanbans.feedback'}">
          <span>Feedback</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{name: 'kanbans.done'}">
          <span>Done</span>
        </router-link>
      </li>
    </ul>
    <p class="menu-label">
      STATS
    </p>
    <ul class="menu-list">
      <li>
        <router-link :to="{name: 'stats.index'}">
          Sizes
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {};
</script>
