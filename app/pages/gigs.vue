<template>
  <div class="page">
    <!-- Hero Search Section -->
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">Find Your Next <span>IT Gig</span></h1>
        <p class="hero-sub">
          Connect with top clients and contractors. Discover opportunities that
          match your skills.
        </p>

        <div class="search-box">
          <div class="search-inner">
            <i class="fas fa-magnifying-glass search-icon"></i>
            <input
              v-model="searchQuery"
              class="search-input"
              type="text"
              placeholder="Search gigs by title, skill, or keyword…"
              @input="handleSearch"
            />
          </div>
          <button
            class="btn btn-primary search-btn"
            @click="loadGigs(searchQuery)"
          >
            Search
          </button>
        </div>

        <div class="popular-tags">
          <span class="tags-label">Popular:</span>
          <button
            v-for="tag in popularTags"
            :key="tag"
            class="tag-pill"
            @click="
              searchQuery = tag;
              loadGigs(tag);
            "
          >
            {{ tag }}
          </button>
        </div>
      </div>
    </div>

    <!-- Page Header -->
    <div class="page-header" style="margin-top: 32px">
      <h2 class="page-title">Browse <span>Gigs</span></h2>
      <button class="btn btn-primary" @click="showCreateGig = true">
        <i class="fas fa-plus"></i> Post a Gig
      </button>
    </div>

    <!-- Gigs Grid -->
    <div class="gigs-grid">
      <div v-if="loading" class="loading-state" style="grid-column: 1/-1">
        <div class="spinner" style="margin: 0 auto 12px"></div>
        <p>Loading gigs…</p>
      </div>
      <div
        v-else-if="!gigs.length"
        class="empty-state"
        style="grid-column: 1/-1"
      >
        <div class="icon">🔍</div>
        <p>No gigs found{{ searchQuery ? ` for "${searchQuery}"` : "" }}</p>
        <button
          v-if="searchQuery"
          class="btn btn-secondary"
          style="margin-top: 12px"
          @click="
            searchQuery = '';
            loadGigs();
          "
        >
          Clear Search
        </button>
      </div>
      <GigCard v-for="gig in gigs" :key="gig.id" :gig="gig" @click="openGig" />
    </div>

    <!-- Modals -->
    <GigDetailModal
      :show="!!selectedGigId"
      :gig-id="selectedGigId"
      @close="selectedGigId = null"
      @bid="openBid"
      @review="openReview"
      @refuse="openRefuse"
      @message="goToMessages"
      @refresh-list="loadGigs(searchQuery)"
    />

    <CreateGigModal
      :show="showCreateGig"
      :skills="skills"
      @close="showCreateGig = false"
      @created="
        () => {
          showCreateGig = false;
          loadGigs(searchQuery);
        }
      "
    />

    <BidModal
      :show="showBid"
      :gig-id="bidGigId"
      @close="showBid = false"
      @submitted="showBid = false"
    />

    <ReviewModal
      :show="showReview"
      :gig-id="reviewGigId"
      @close="showReview = false"
      @submitted="showReview = false"
    />

    <RefuseModal
      :show="showRefuse"
      :gig-id="refuseGigId"
      @close="showRefuse = false"
      @refused="
        () => {
          showRefuse = false;
          loadGigs(searchQuery);
        }
      "
    />
  </div>
</template>

<script setup lang="ts">
// definePageMeta({ middleware: 'auth' })

// const { api } = useApi()
// const { toast } = useToast()
const router = useRouter();

const gigs = ref<any[]>([]);
const loading = ref(false);
const searchQuery = ref("");
const skills = ref<any[]>([]);

const selectedGigId = ref<string | null>(null);
const showCreateGig = ref(false);
const showBid = ref(false);
const bidGigId = ref<string | null>(null);
const showReview = ref(false);
const reviewGigId = ref<string | null>(null);
const showRefuse = ref(false);
const refuseGigId = ref<string | null>(null);

let searchTimer: ReturnType<typeof setTimeout> | null = null;

const popularTags = [
  "React Developer",
  "UI/UX Design",
  "Backend API",
  "Mobile App",
  "DevOps",
];

const loadGigs = async (q = "") => {
  // loading.value = true
  // try {
  //   const qs = q ? `?q=${encodeURIComponent(q)}` : ''
  //   const data = await api('GET', `/api/v1/gigs${qs}`)
  //   gigs.value = data?.data || []
  // } catch (e: any) {
  //   toast(e.message, 'error')
  // } finally {
  //   loading.value = false
  // }
};

const handleSearch = () => {
  if (searchTimer) clearTimeout(searchTimer);
  searchTimer = setTimeout(() => loadGigs(searchQuery.value), 400);
};

const openGig = (id: string) => {
  selectedGigId.value = id;
};
const openBid = (id: string) => {
  bidGigId.value = id;
  showBid.value = true;
};
const openReview = (id: string) => {
  reviewGigId.value = id;
  showReview.value = true;
};
const openRefuse = (id: string) => {
  refuseGigId.value = id;
  showRefuse.value = true;
};

const goToMessages = ({
  userId,
  userName,
}: {
  userId: string;
  userName: string;
}) => {
  router.push({ path: "/messages", query: { userId, userName } });
};

const loadSkills = async () => {
  // try {
  //   const data = await api('GET', '/api/v1/skills')
  //   skills.value = data?.data?.skills || []
  // } catch {}
};

onMounted(() => {
  loadGigs();
  loadSkills();
});
</script>

<style scoped>
/* Hero */
.hero-section {
  background: linear-gradient(135deg, var(--surface) 0%, var(--bg) 100%);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 40px;
  margin-bottom: 8px;
  position: relative;
  overflow: hidden;
}
.hero-section::before {
  content: "";
  position: absolute;
  top: -50%;
  right: -20%;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(0, 229, 192, 0.05) 0%,
    transparent 70%
  );
  pointer-events: none;
}
.hero-content {
  max-width: 640px;
  position: relative;
  z-index: 1;
}
.hero-title {
  font-family: "Syne", sans-serif;
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 10px;
  line-height: 1.2;
}
.hero-title span {
  color: var(--accent);
}
.hero-sub {
  color: var(--text2);
  font-size: 1rem;
  margin-bottom: 24px;
  line-height: 1.6;
}

.search-box {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 6px;
}
.search-inner {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--surface3);
  border-radius: 10px;
  padding: 10px 14px;
}
.search-icon {
  color: var(--text3);
  flex-shrink: 0;
}
.search-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: var(--text);
  font-family: "DM Sans", sans-serif;
  font-size: 0.9rem;
}
.search-input::placeholder {
  color: var(--text3);
}
.search-btn {
  border-radius: 10px !important;
  padding: 10px 24px !important;
}

.popular-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}
.tags-label {
  font-size: 0.82rem;
  color: var(--text3);
}
.tag-pill {
  padding: 4px 14px;
  border-radius: 20px;
  font-size: 0.82rem;
  background: var(--accent-dim);
  color: var(--accent);
  border: 1px solid rgba(0, 229, 192, 0.2);
  cursor: pointer;
  transition: var(--transition);
  font-family: "DM Sans", sans-serif;
}
.tag-pill:hover {
  background: var(--accent);
  color: var(--bg);
}

/* Grid */
.gigs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
}
.loading-state {
  text-align: center;
  padding: 48px 20px;
  color: var(--text3);
}
</style>
