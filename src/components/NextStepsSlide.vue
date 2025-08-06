<template>
  <div class="next-steps-slide">
    <div class="content">
      <h1 class="title">Следующие шаги</h1>
      <h2 class="subtitle">План вовлечения команды</h2>

      <div class="steps-container">
        <div class="step">
          <div class="step-number">1</div>
          <div class="step-content">
            <h3>Немедленные действия</h3>
            <div class="step-items">
              <div class="step-item">
                <div class="item-icon">📋</div>
                <div class="item-text">Создание детального плана</div>
              </div>
              <div class="step-item">
                <div class="item-icon">👥</div>
                <div class="item-text">Формирование команды</div>
              </div>
              <div class="step-item">
                <div class="item-icon">⚙️</div>
                <div class="item-text">Настройка инструментов</div>
              </div>
            </div>
          </div>
        </div>

        <div class="step">
          <div class="step-number">2</div>
          <div class="step-content">
            <h3>Обучение команды</h3>
            <div class="step-items">
              <div class="step-item">
                <div class="item-icon">🎓</div>
                <div class="item-text">Проведение воркшопов</div>
              </div>
              <div class="step-item">
                <div class="item-icon">📚</div>
                <div class="item-text">Документация процессов</div>
              </div>
              <div class="step-item">
                <div class="item-icon">🤝</div>
                <div class="item-text">Менторство и поддержка</div>
              </div>
            </div>
          </div>
        </div>

        <div class="step">
          <div class="step-number">3</div>
          <div class="step-content">
            <h3>Внедрение и мониторинг</h3>
            <div class="step-items">
              <div class="step-item">
                <div class="item-icon">🚀</div>
                <div class="item-text">Поэтапный запуск</div>
              </div>
              <div class="step-item">
                <div class="item-icon">📊</div>
                <div class="item-text">Отслеживание метрик</div>
              </div>
              <div class="step-item">
                <div class="item-icon">🔄</div>
                <div class="item-text">Итеративные улучшения</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="engagement-section">
        <h3>Стратегия вовлечения</h3>
        <div class="engagement-grid">
          <div class="engagement-card">
            <div class="card-icon">💡</div>
            <h4>Прозрачность</h4>
            <p>Открытое обсуждение целей и прогресса</p>
          </div>
          <div class="engagement-card">
            <div class="card-icon">🏆</div>
            <h4>Признание</h4>
            <p>Отмечаем достижения и успехи команды</p>
          </div>
          <div class="engagement-card">
            <div class="card-icon">🎯</div>
            <h4>Ответственность</h4>
            <p>Четкое распределение ролей и задач</p>
          </div>
          <div class="engagement-card">
            <div class="card-icon">🌟</div>
            <h4>Развитие</h4>
            <p>Возможности для роста и обучения</p>
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
      ".step",
      {
        duration: 0.8,
        x: -100,
        opacity: 0,
        stagger: 0.3,
        ease: "power2.out",
      },
      "-=0.3"
    )
    .from(
      ".step-item",
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
      ".engagement-card",
      {
        duration: 0.6,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: "power2.out",
      },
      "-=0.2"
    );

  hasAnimated.value = true;
});
</script>

<style scoped>
.next-steps-slide {
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

.steps-container {
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-bottom: 50px;
  flex: 1;
  justify-content: center;
}

.step {
  display: flex;
  align-items: flex-start;
  gap: 30px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 30px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  height: fit-content;
}

.step-number {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  flex-shrink: 0;
}

.step:nth-child(2) .step-number {
  background: linear-gradient(45deg, #51cf66, #69db7c);
}

.step:nth-child(3) .step-number {
  background: linear-gradient(45deg, #339af0, #74c0fc);
}

.step-content {
  flex: 1;
}

.step-content h3 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #fff;
}

.step-items {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.step-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  transition: transform 0.3s ease;
}

.step-item:hover {
  transform: translateX(10px);
}

.item-icon {
  font-size: 1.3rem;
  min-width: 30px;
}

.item-text {
  font-size: 1rem;
  font-weight: 500;
}

.engagement-section {
  text-align: center;
}

.engagement-section h3 {
  font-size: 2rem;
  margin-bottom: 30px;
}

.engagement-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
}

.engagement-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 25px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease;
  height: fit-content;
}

.engagement-card:hover {
  transform: translateY(-5px);
}

.card-icon {
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.engagement-card h4 {
  font-size: 1.3rem;
  margin-bottom: 10px;
  color: #fff;
}

.engagement-card p {
  font-size: 0.9rem;
  opacity: 0.9;
  line-height: 1.4;
}

@media (max-width: 768px) {
  .title {
    font-size: 2.5rem;
  }

  .subtitle {
    font-size: 1.5rem;
  }

  .step {
    flex-direction: column;
    text-align: center;
  }

  .engagement-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .content {
    padding: 20px;
  }
}
</style>
