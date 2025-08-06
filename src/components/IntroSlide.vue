<template>
  <div
    class="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white overflow-hidden relative"
  >
    <div class="text-center max-w-4xl px-10 w-full">
      <h1 class="text-6xl font-bold mb-8 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">Вступление</h1>
      <div class="mb-12">
        <p class="text-2xl mb-4 opacity-90">Добро пожаловать в нашу презентацию</p>
        <p class="text-2xl opacity-90">Сегодня мы обсудим важные вопросы и наметим план действий</p>
      </div>
      <div class="flex justify-center gap-10 mt-16 flex-wrap">
        <div
          class="text-center p-5 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20 transition-transform duration-300 hover:-translate-y-1 min-w-48"
        >
          <div class="text-5xl mb-4">🎯</div>
          <div class="text-lg font-medium">Целеориентированный подход</div>
        </div>
        <div
          class="text-center p-5 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20 transition-transform duration-300 hover:-translate-y-1 min-w-48"
        >
          <div class="text-5xl mb-4">⚡</div>
          <div class="text-lg font-medium">Быстрая реализация</div>
        </div>
        <div
          class="text-center p-5 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20 transition-transform duration-300 hover:-translate-y-1 min-w-48"
        >
          <div class="text-5xl mb-4">📊</div>
          <div class="text-lg font-medium">Измеримые результаты</div>
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
      "p",
      {
        duration: 0.8,
        y: 30,
        opacity: 0,
        stagger: 0.2,
        ease: "power2.out",
      },
      "-=0.5"
    )
    .from(
      ".text-center > div",
      {
        duration: 0.6,
        x: -50,
        opacity: 0,
        stagger: 0.2,
        ease: "power2.out",
      },
      "-=0.3"
    );

  hasAnimated.value = true;
});
</script>

<style scoped>
.intro-slide {
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
  text-align: center;
  max-width: 800px;
  padding: 40px;
  width: 100%;
}

.title {
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 30px;
  background: linear-gradient(45deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  margin-bottom: 50px;
}

.subtitle p {
  font-size: 1.5rem;
  margin-bottom: 15px;
  opacity: 0.9;
}

.features {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 60px;
  flex-wrap: wrap;
}

.feature {
  text-align: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease;
  min-width: 200px;
}

.feature:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 15px;
}

.feature-text {
  font-size: 1.1rem;
  font-weight: 500;
}

@media (max-width: 768px) {
  .title {
    font-size: 2.5rem;
  }

  .subtitle p {
    font-size: 1.2rem;
  }

  .features {
    flex-direction: column;
    gap: 20px;
  }

  .feature-icon {
    font-size: 2.5rem;
  }

  .content {
    padding: 20px;
  }
}
</style>
