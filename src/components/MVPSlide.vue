<template>
  <div
    class="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white overflow-hidden relative"
  >
    <div class="w-full max-w-7xl px-10 h-full flex flex-col justify-center">
      <h1 class="text-6xl font-bold mb-3 text-center bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
        План действий
      </h1>
      <h2 class="text-4xl mb-12 text-center opacity-90">MVP за 2 недели</h2>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-12 flex-1 items-center">
        <div class="bg-white/10 rounded-3xl p-8 backdrop-blur-md border border-white/20 h-fit">
          <div class="flex items-center gap-5 mb-8">
            <div
              class="w-12 h-12 rounded-full bg-gradient-to-r from-red-400 to-red-500 flex items-center justify-center text-2xl font-bold"
            >
              1
            </div>
            <h3 class="text-3xl">Неделя 1</h3>
          </div>
          <div class="flex flex-col gap-5">
            <div class="flex items-start gap-4 p-4 bg-white/5 rounded-xl transition-transform duration-300 hover:translate-x-2">
              <div class="text-2xl min-w-10">📋</div>
              <div class="flex-1">
                <div class="text-lg font-semibold mb-1">Анализ и планирование</div>
                <div class="text-sm opacity-80">Изучение требований и создание технического задания</div>
              </div>
            </div>
            <div class="flex items-start gap-4 p-4 bg-white/5 rounded-xl transition-transform duration-300 hover:translate-x-2">
              <div class="text-2xl min-w-10">🏗️</div>
              <div class="flex-1">
                <div class="text-lg font-semibold mb-1">Архитектура</div>
                <div class="text-sm opacity-80">Проектирование системы и выбор технологий</div>
              </div>
            </div>
            <div class="flex items-start gap-4 p-4 bg-white/5 rounded-xl transition-transform duration-300 hover:translate-x-2">
              <div class="text-2xl min-w-10">⚙️</div>
              <div class="flex-1">
                <div class="text-lg font-semibold mb-1">Настройка окружения</div>
                <div class="text-sm opacity-80">Подготовка инфраструктуры и инструментов</div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white/10 rounded-3xl p-8 backdrop-blur-md border border-white/20 h-fit">
          <div class="flex items-center gap-5 mb-8">
            <div
              class="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-green-500 flex items-center justify-center text-2xl font-bold"
            >
              2
            </div>
            <h3 class="text-3xl">Неделя 2</h3>
          </div>
          <div class="flex flex-col gap-5">
            <div class="flex items-start gap-4 p-4 bg-white/5 rounded-xl transition-transform duration-300 hover:translate-x-2">
              <div class="text-2xl min-w-10">💻</div>
              <div class="flex-1">
                <div class="text-lg font-semibold mb-1">Разработка MVP</div>
                <div class="text-sm opacity-80">Создание базового функционала</div>
              </div>
            </div>
            <div class="flex items-start gap-4 p-4 bg-white/5 rounded-xl transition-transform duration-300 hover:translate-x-2">
              <div class="text-2xl min-w-10">🧪</div>
              <div class="flex-1">
                <div class="text-lg font-semibold mb-1">Тестирование</div>
                <div class="text-sm opacity-80">Проверка работоспособности и исправление багов</div>
              </div>
            </div>
            <div class="flex items-start gap-4 p-4 bg-white/5 rounded-xl transition-transform duration-300 hover:translate-x-2">
              <div class="text-2xl min-w-10">🚀</div>
              <div class="flex-1">
                <div class="text-lg font-semibold mb-1">Деплой</div>
                <div class="text-sm opacity-80">Развертывание в продакшн</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center gap-10 flex-wrap">
        <div
          class="text-center p-5 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20 transition-transform duration-300 hover:-translate-y-1 min-w-36"
        >
          <div class="text-4xl mb-3">🎯</div>
          <div class="text-base font-medium">Фокус на главном</div>
        </div>
        <div
          class="text-center p-5 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20 transition-transform duration-300 hover:-translate-y-1 min-w-36"
        >
          <div class="text-4xl mb-3">⚡</div>
          <div class="text-base font-medium">Быстрые итерации</div>
        </div>
        <div
          class="text-center p-5 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20 transition-transform duration-300 hover:-translate-y-1 min-w-36"
        >
          <div class="text-4xl mb-3">📊</div>
          <div class="text-base font-medium">Измеримые результаты</div>
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
      "h2",
      {
        duration: 0.8,
        y: 30,
        opacity: 0,
        ease: "power2.out",
      },
      "-=0.5"
    )
    .from(
      ".grid > div",
      {
        duration: 0.8,
        x: (i) => (i === 0 ? -100 : 100),
        opacity: 0,
        stagger: 0.3,
        ease: "power2.out",
      },
      "-=0.3"
    )
    .from(
      ".flex.items-start",
      {
        duration: 0.6,
        y: 30,
        opacity: 0,
        stagger: 0.1,
        ease: "power2.out",
      },
      "-=0.3"
    )
    .from(
      ".text-center",
      {
        duration: 0.5,
        scale: 0,
        opacity: 0,
        stagger: 0.2,
        ease: "back.out(1.7)",
      },
      "-=0.2"
    );

  hasAnimated.value = true;
});
</script>

<style scoped>
.mvp-slide {
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
  max-width: 1400px;
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
  margin-bottom: 10px;
  background: linear-gradient(45deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 50px;
  opacity: 0.9;
}

.timeline {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  margin-bottom: 50px;
  flex: 1;
  align-items: center;
}

.week {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 30px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  height: fit-content;
}

.week-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
}

.week-number {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
}

.week-2 .week-number {
  background: linear-gradient(45deg, #51cf66, #69db7c);
}

.week h3 {
  font-size: 1.8rem;
  margin: 0;
}

.tasks {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.task {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  transition: transform 0.3s ease;
}

.task:hover {
  transform: translateX(10px);
}

.task-icon {
  font-size: 1.5rem;
  min-width: 40px;
}

.task-content {
  flex: 1;
}

.task-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 5px;
}

.task-desc {
  font-size: 0.9rem;
  opacity: 0.8;
}

.key-points {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 40px;
  flex-wrap: wrap;
}

.point {
  text-align: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease;
  min-width: 150px;
}

.point:hover {
  transform: translateY(-5px);
}

.point-icon {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.point-text {
  font-size: 1rem;
  font-weight: 500;
}

@media (max-width: 768px) {
  .title {
    font-size: 2.5rem;
  }

  .subtitle {
    font-size: 1.5rem;
  }

  .timeline {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .key-points {
    flex-direction: column;
    gap: 20px;
  }

  .content {
    padding: 20px;
  }
}
</style>
