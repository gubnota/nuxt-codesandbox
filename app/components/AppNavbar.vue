<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <span class="brand-icon"></span>
      Gig<span class="brand-accent">Forge</span>
    </div>

    <div class="nav-tabs">
      <NuxtLink
        to="/gigs"
        class="nav-tab"
        :class="{ active: route.path.startsWith('/gigs') }"
      >
        <i class="fas fa-briefcase"></i> Browse Gigs
      </NuxtLink>
      <NuxtLink
        to="/my-gigs"
        class="nav-tab"
        :class="{ active: route.path.startsWith('/my-gigs') }"
      >
        <i class="fas fa-folder-open"></i> My Gigs
      </NuxtLink>
      <NuxtLink
        to="/messages"
        class="nav-tab"
        :class="{ active: route.path.startsWith('/messages') }"
      >
        <!-- @click="sse.clearUnread()" -->
        <i class="fas fa-message"></i> Messages
        <!-- <span v-if="sse.unreadCount.value > 0" class="badge">{{
          sse.unreadCount.value
        }}</span> -->
      </NuxtLink>
      <NuxtLink
        to="/wallet"
        class="nav-tab wallet-tab"
        :class="{ active: route.path.startsWith('/wallet') }"
      >
        <i class="fas fa-wallet"></i> Wallet
        <span class="balance-chip" v-if="balance !== null">{{
          balanceFmt
        }}</span>
      </NuxtLink>
    </div>

    <div class="nav-right">
      <div class="user-pill">
        <div class="dot"></div>
        <span>{{ "authStore.displayName" }}</span>
      </div>
      <div class="sse-indicator" :class="{ connected: true }">
        <div class="dot"></div>
        <span>{{ /*sse.connected.value ? "Live" : */ "SSE" }}</span>
      </div>
      <button class="btn-logout" @click="handleLogout">
        <i class="fas fa-arrow-right-from-bracket"></i> Logout
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();
// const authStore = useAuthStore();
// const sse = useSSE();
// const { toast } = useToast();
// const { api } = useApi();

const balance = ref<number | null>(null);

const balanceFmt = computed(() => {
  if (balance.value === null) return "";
  if (balance.value >= 1000) return `$${(balance.value / 1000).toFixed(1)}k`;
  return `$${balance.value.toFixed(2)}`;
});

onMounted(async () => {
  // try {
  //   const data = await api("GET", "/api/v1/balance");
  //   balance.value = data?.data?.balance_usdt ?? 0;
  // } catch {}
});

const handleLogout = () => {
  // sse.disconnect();
  // authStore.logout();
  // toast("Logged out", "info");
  // router.push("/auth");
};
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(13, 15, 20, 0.92);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;
  height: 60px;
  gap: 12px;
}

.navbar-brand {
  font-family: "Syne", sans-serif;
  font-weight: 800;
  font-size: 1.3rem;
  color: var(--text);
  letter-spacing: -0.5px;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}
.brand-accent {
  color: var(--accent);
}
.brand-icon {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  flex-shrink: 0;
}

.nav-tabs {
  display: flex;
  gap: 4px;
}

.nav-tab {
  padding: 6px 14px;
  border-radius: 8px;
  color: var(--text2);
  font-family: "DM Sans", sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  transition: var(--transition);
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
}
.nav-tab:hover {
  background: var(--surface2);
  color: var(--text);
}
.nav-tab.active {
  background: var(--accent-dim);
  color: var(--accent);
}

.balance-chip {
  font-family: "DM Mono", monospace;
  font-size: 0.68rem;
  font-weight: 700;
  padding: 1px 7px;
  border-radius: 10px;
  background: var(--surface3);
  color: var(--success);
}
.wallet-tab.active .balance-chip {
  background: rgba(0, 229, 192, 0.2);
}

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--accent);
  color: var(--bg);
  font-size: 0.65rem;
  font-weight: 700;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.user-pill {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 12px;
  border-radius: 20px;
  background: var(--surface2);
  font-size: 0.8rem;
  color: var(--text2);
  white-space: nowrap;
}
.user-pill .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
  flex-shrink: 0;
}

.sse-indicator {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  color: var(--text3);
  padding: 4px 10px;
  border-radius: 20px;
  background: var(--surface2);
}
.sse-indicator .dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--text3);
}
.sse-indicator.connected .dot {
  background: var(--accent);
  animation: pulse 2s infinite;
}

.btn-logout {
  padding: 6px 14px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text2);
  font-size: 0.8rem;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: "DM Sans", sans-serif;
}
.btn-logout:hover {
  border-color: var(--danger);
  color: var(--danger);
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}

@media (max-width: 768px) {
  .sse-indicator,
  .user-pill span {
    display: none;
  }
  .balance-chip {
    display: none;
  }
}
</style>
