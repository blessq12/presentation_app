<template>
  <div
    class="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white overflow-hidden relative"
  >
    <div class="w-full max-w-7xl px-10 h-full flex flex-col justify-center">
      <h1 class="text-6xl font-bold mb-12 text-center bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
        Проблемы и профиты
      </h1>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 flex-1 items-center">
        <div class="bg-white/10 rounded-3xl p-8 backdrop-blur-md border border-white/20 h-fit">
          <h2 class="text-4xl mb-8 text-center">🚨 Проблемы</h2>
          <div class="flex flex-col gap-5">
            <div
              class="flex items-center gap-4 p-4 bg-white/5 rounded-xl transition-transform duration-300 hover:translate-x-2 border-l-4 border-red-400"
            >
              <div class="text-2xl min-w-10">❌</div>
              <div class="text-lg font-medium">Отсутствие четкого плана</div>
            </div>
            <div
              class="flex items-center gap-4 p-4 bg-white/5 rounded-xl transition-transform duration-300 hover:translate-x-2 border-l-4 border-red-400"
            >
              <div class="text-2xl min-w-10">⏰</div>
              <div class="text-lg font-medium">Потеря времени на неважном</div>
            </div>
            <div
              class="flex items-center gap-4 p-4 bg-white/5 rounded-xl transition-transform duration-300 hover:translate-x-2 border-l-4 border-red-400"
            >
              <div class="text-2xl min-w-10">💰</div>
              <div class="text-lg font-medium">Неэффективное использование ресурсов</div>
            </div>
            <div
              class="flex items-center gap-4 p-4 bg-white/5 rounded-xl transition-transform duration-300 hover:translate-x-2 border-l-4 border-red-400"
            >
              <div class="text-2xl min-w-10">📉</div>
              <div class="text-lg font-medium">Отсутствие измеримых результатов</div>
            </div>
          </div>
        </div>

        <div class="bg-white/10 rounded-3xl p-8 backdrop-blur-md border border-white/20 h-fit">
          <h2 class="text-4xl mb-8 text-center">✅ Профиты</h2>
          <div class="flex flex-col gap-5">
            <div
              class="flex items-center gap-4 p-4 bg-white/5 rounded-xl transition-transform duration-300 hover:translate-x-2 border-l-4 border-green-400"
            >
              <div class="text-2xl min-w-10">🎯</div>
              <div class="text-lg font-medium">Четкие цели и приоритеты</div>
            </div>
            <div
              class="flex items-center gap-4 p-4 bg-white/5 rounded-xl transition-transform duration-300 hover:translate-x-2 border-l-4 border-green-400"
            >
              <div class="text-2xl min-w-10">⚡</div>
              <div class="text-lg font-medium">Быстрые победы и мотивация</div>
            </div>
            <div
              class="flex items-center gap-4 p-4 bg-white/5 rounded-xl transition-transform duration-300 hover:translate-x-2 border-l-4 border-green-400"
            >
              <div class="text-2xl min-w-10">📈</div>
              <div class="text-lg font-medium">Измеримый прогресс</div>
            </div>
            <div
              class="flex items-center gap-4 p-4 bg-white/5 rounded-xl transition-transform duration-300 hover:translate-x-2 border-l-4 border-green-400"
            >
              <div class="text-2xl min-w-10">🚀</div>
              <div class="text-lg font-medium">Масштабируемые решения</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { gsap } from "gsap";
import { onMounted, ref } from "vue";

const hasAnimated = ref(false);

onMounted(() => {
  if (hasAnimated.value) return;

  const tl = gsap.timeline();

  tl.from("h1", {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: "power2.out",
  })
    .from(
      ".grid > div",
      {
        duration: 0.8,
        x: (i) => (i === 0 ? -100 : 100),
        opacity: 0,
        stagger: 0.3,
        ease: "power2.out",
      },
      "-=0.5"
    )
    .from(
      ".flex.items-center",
      {
        duration: 0.6,
        y: 30,
        opacity: 0,
        stagger: 0.1,
        ease: "power2.out",
      },
      "-=0.3"
    );

  hasAnimated.value = true;
});
</script>

<style scoped>
.problems-slide {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  overflow: hidden;
  position: relative;
}

.content {
  width: 100%;
  max-width: 1200px;
  padding: 40px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.title {
  text-align: center;
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 50px;
  background: linear-gradient(45deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.sections {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  flex: 1;
  align-items: center;
}

.section {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 30px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  height: fit-content;
}

.section h2 {
  font-size: 2rem;
  margin-bottom: 30px;
  text-align: center;
}

.items {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  transition: transform 0.3s ease;
}

.item:hover {
  transform: translateX(10px);
}

.item-icon {
  font-size: 1.5rem;
  min-width: 40px;
}

.item-text {
  font-size: 1.1rem;
  font-weight: 500;
}

.problems .item {
  border-left: 4px solid #ff6b6b;
}

.benefits .item {
  border-left: 4px solid #51cf66;
}

@media (max-width: 768px) {
  .title {
    font-size: 2.5rem;
  }

  .sections {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .section h2 {
    font-size: 1.5rem;
  }

  .item-text {
    font-size: 1rem;
  }

  .content {
    padding: 20px;
  }
}
</style>
