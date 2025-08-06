<template>
  <div class="metrics-slide">
    <div class="content">
      <h1 class="title">Измерение прогресса</h1>
      <h2 class="subtitle">Ключевые метрики и KPI</h2>

      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-icon">📈</div>
          <h3>Продуктивность</h3>
          <div class="metric-value">+40%</div>
          <div class="metric-desc">Увеличение скорости разработки</div>
          <div class="metric-indicators">
            <div class="indicator">Время до релиза</div>
            <div class="indicator">Количество деплоев</div>
            <div class="indicator">Скорость фиксов</div>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-icon">🎯</div>
          <h3>Качество</h3>
          <div class="metric-value">-60%</div>
          <div class="metric-desc">Снижение количества багов</div>
          <div class="metric-indicators">
            <div class="indicator">Критические ошибки</div>
            <div class="indicator">Покрытие тестами</div>
            <div class="indicator">Стабильность системы</div>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-icon">💰</div>
          <h3>Эффективность</h3>
          <div class="metric-value">+25%</div>
          <div class="metric-desc">Оптимизация ресурсов</div>
          <div class="metric-indicators">
            <div class="indicator">Временные затраты</div>
            <div class="indicator">Финансовые затраты</div>
            <div class="indicator">ROI проектов</div>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-icon">👥</div>
          <h3>Команда</h3>
          <div class="metric-value">+35%</div>
          <div class="metric-desc">Улучшение мотивации</div>
          <div class="metric-indicators">
            <div class="indicator">Удовлетворенность</div>
            <div class="indicator">Удержание кадров</div>
            <div class="indicator">Скорость обучения</div>
          </div>
        </div>
      </div>

      <div class="tracking-tools">
        <h3>Инструменты отслеживания</h3>
        <div class="tools">
          <div class="tool">
            <div class="tool-icon">📊</div>
            <div class="tool-name">Analytics</div>
          </div>
          <div class="tool">
            <div class="tool-icon">📈</div>
            <div class="tool-name">Dashboards</div>
          </div>
          <div class="tool">
            <div class="tool-icon">🔔</div>
            <div class="tool-name">Alerts</div>
          </div>
          <div class="tool">
            <div class="tool-icon">📋</div>
            <div class="tool-name">Reports</div>
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

  tl.from(".title", {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: "power2.out",
  })
    .from(
      ".subtitle",
      {
        duration: 0.8,
        y: 30,
        opacity: 0,
        ease: "power2.out",
      },
      "-=0.5"
    )
    .from(
      ".metric-card",
      {
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: "power2.out",
      },
      "-=0.3"
    )
    .from(
      ".tool",
      {
        duration: 0.5,
        scale: 0,
        opacity: 0,
        stagger: 0.1,
        ease: "back.out(1.7)",
      },
      "-=0.2"
    );

  hasAnimated.value = true;
});
</script>

<style scoped>
.metrics-slide {
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

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  margin-bottom: 50px;
  flex: 1;
  align-items: center;
}

.metric-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 30px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
  transition: transform 0.3s ease;
  height: fit-content;
}

.metric-card:hover {
  transform: translateY(-10px);
}

.metric-icon {
  font-size: 3rem;
  margin-bottom: 20px;
}

.metric-card h3 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #fff;
}

.metric-value {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 10px;
  background: linear-gradient(45deg, #51cf66, #69db7c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.metric-desc {
  font-size: 1rem;
  margin-bottom: 20px;
  opacity: 0.9;
}

.metric-indicators {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.indicator {
  font-size: 0.9rem;
  opacity: 0.8;
  padding: 5px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 5px;
}

.tracking-tools {
  text-align: center;
}

.tracking-tools h3 {
  font-size: 1.8rem;
  margin-bottom: 30px;
}

.tools {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
}

.tool {
  text-align: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease;
  min-width: 120px;
}

.tool:hover {
  transform: translateY(-5px);
}

.tool-icon {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.tool-name {
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

  .metrics-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .tools {
    flex-wrap: wrap;
    gap: 20px;
  }

  .content {
    padding: 20px;
  }
}
</style>
