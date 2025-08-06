<script setup>
import { gsap } from "gsap";
import { onMounted, onUnmounted, ref } from "vue";
import ConclusionSlide from "./components/ConclusionSlide.vue";
import IntroSlide from "./components/IntroSlide.vue";
import MVPSlide from "./components/MVPSlide.vue";
import MetricsSlide from "./components/MetricsSlide.vue";
import NextStepsSlide from "./components/NextStepsSlide.vue";
import ProblemsSlide from "./components/ProblemsSlide.vue";

// WebSocket connection
const serverUrl = ref("ws://109.197.125.39:8090");
const isConnected = ref(false);
const ws = ref(null);

// Demo state
const activeSection = ref(0);
const isTransitioning = ref(false);
const sectionRefs = ref([]);

// Demo sections
const sections = ref([
  {
    title: "Вступление",
    component: IntroSlide,
  },
  {
    title: "Проблемы и профиты",
    component: ProblemsSlide,
  },
  {
    title: "План действий (MVP за 2 недели)",
    component: MVPSlide,
  },
  {
    title: "Как будем измерять прогресс",
    component: MetricsSlide,
  },
  {
    title: "Следующие шаги и вовлечение",
    component: NextStepsSlide,
  },
  {
    title: "Заключение",
    component: ConclusionSlide,
  },
]);

// WebSocket connection
const connect = () => {
  try {
    ws.value = new WebSocket(serverUrl.value);

    ws.value.onopen = () => {
      console.log("Подключен к серверу");
      // Регистрируемся как презентация
      ws.value.send(
        JSON.stringify({
          type: "register_client",
          clientType: "presentation",
        })
      );
    };

    ws.value.onmessage = (event) => {
      const data = JSON.parse(event.data);
      handleCommand(data);
    };

    ws.value.onclose = () => {
      isConnected.value = false;
      console.log("Соединение разорвано");
    };

    ws.value.onerror = (error) => {
      console.error("WebSocket ошибка:", error);
    };
  } catch (error) {
    console.error("Ошибка подключения:", error);
  }
};

// Command handling
const handleCommand = (data) => {
  switch (data.type) {
    case "client_registered":
      isConnected.value = true;
      console.log("Зарегистрирован как презентация");
      break;
    case "next_slide":
      nextSection();
      break;
    case "prev_slide":
      prevSection();
      break;
    case "go_to_slide":
      goToSection(data.slideIndex);
      break;

    case "welcome":
      // Приветственное сообщение
      break;
    default:
      console.log("Получена команда:", data);
  }
};

// GSAP animations for slide transitions
const animateSectionTransition = async (fromIndex, toIndex) => {
  if (isTransitioning.value) return;

  isTransitioning.value = true;

  const tl = gsap.timeline();

  // Fade out current slide
  if (sectionRefs.value[fromIndex]) {
    tl.to(sectionRefs.value[fromIndex], {
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  }

  // Change active section
  activeSection.value = toIndex;

  // Fade in new slide
  if (sectionRefs.value[toIndex]) {
    tl.to(
      sectionRefs.value[toIndex],
      {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      },
      "-=0.1"
    );
  }

  // Wait for animation to complete
  await tl.then(() => {
    isTransitioning.value = false;
  });
};

// Navigation methods
const nextSection = async () => {
  if (activeSection.value < sections.value.length - 1 && !isTransitioning.value) {
    await animateSectionTransition(activeSection.value, activeSection.value + 1);
  }
};

const prevSection = async () => {
  if (activeSection.value > 0 && !isTransitioning.value) {
    await animateSectionTransition(activeSection.value, activeSection.value - 1);
  }
};

const goToSection = async (index) => {
  if (index >= 0 && index < sections.value.length && !isTransitioning.value && index !== activeSection.value) {
    await animateSectionTransition(activeSection.value, index);
  }
};

// Initialize slides on mount
onMounted(() => {
  connect();

  // Set initial state for all slides
  gsap.set(sectionRefs.value, { opacity: 0 });
  gsap.set(sectionRefs.value[0], { opacity: 1 });
});

onUnmounted(() => {
  if (ws.value) {
    ws.value.close();
  }
});
</script>

<template>
  <div class="w-screen h-screen relative overflow-hidden m-0 p-0">
    <!-- Connection Status -->
    <div
      class="fixed top-5 right-5 flex items-center gap-2.5 bg-black/30 backdrop-blur-md px-4 py-2.5 rounded-full z-50 text-white"
    >
      <div
        class="w-3 h-3 rounded-full transition-colors duration-300"
        :class="isConnected ? 'bg-green-500 shadow-lg shadow-green-500' : 'bg-red-500'"
      ></div>
      <span>{{ isConnected ? "Подключен" : "Ожидание подключения..." }}</span>
    </div>

    <!-- Demo Sections -->
    <div class="w-full h-full relative overflow-hidden">
      <div
        v-for="(section, index) in sections"
        :key="index"
        class="absolute top-0 left-0 w-full h-full overflow-hidden"
        :class="{
          'opacity-100': activeSection === index,
          'opacity-0': activeSection !== index,
        }"
        :ref="(el) => (sectionRefs[index] = el)"
      >
        <component :is="section.component" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
