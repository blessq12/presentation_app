<template>
  <div class="conclusion-slide">
    <div class="content">
      <h1 class="title">Заключение</h1>
      <h2 class="subtitle">Ключевые выводы и призыв к действию</h2>

      <div class="summary-section">
        <div class="summary-card">
          <div class="card-icon">🎯</div>
          <h3>Четкий план</h3>
          <p>У нас есть детальная дорожная карта на 2 недели с измеримыми результатами</p>
        </div>

        <div class="summary-card">
          <div class="card-icon">⚡</div>
          <h3>Быстрые победы</h3>
          <p>MVP подход позволит увидеть результаты уже через 14 дней</p>
        </div>

        <div class="summary-card">
          <div class="card-icon">📊</div>
          <h3>Измеримость</h3>
          <p>Конкретные метрики для отслеживания прогресса и успеха</p>
        </div>
      </div>

      <div class="call-to-action">
        <h3>Готовы начать?</h3>
        <div class="action-items">
          <div class="action-item">
            <div class="action-icon">🚀</div>
            <div class="action-text">Начнем реализацию сегодня</div>
          </div>
          <div class="action-item">
            <div class="action-icon">👥</div>
            <div class="action-text">Соберем команду завтра</div>
          </div>
          <div class="action-item">
            <div class="action-icon">📈</div>
            <div class="action-text">Увидим первые результаты через неделю</div>
          </div>
        </div>
      </div>

      <div class="contact-info">
        <h3>Остались вопросы?</h3>
        <div class="contact-methods">
          <div class="contact-method">
            <div class="method-icon">💬</div>
            <div class="method-text">Обсудим детали</div>
          </div>
          <div class="contact-method">
            <div class="method-icon">📧</div>
            <div class="method-text">Напишите нам</div>
          </div>
          <div class="contact-method">
            <div class="method-icon">📞</div>
            <div class="method-text">Позвоните прямо сейчас</div>
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
      ".summary-card",
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
      ".action-item",
      {
        duration: 0.6,
        x: -50,
        opacity: 0,
        stagger: 0.2,
        ease: "power2.out",
      },
      "-=0.2"
    )
    .from(
      ".contact-method",
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
.conclusion-slide {
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

.summary-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-bottom: 60px;
  flex: 1;
  align-items: center;
}

.summary-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 30px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
  transition: transform 0.3s ease;
  height: fit-content;
}

.summary-card:hover {
  transform: translateY(-10px);
}

.card-icon {
  font-size: 3rem;
  margin-bottom: 20px;
}

.summary-card h3 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #fff;
}

.summary-card p {
  font-size: 1rem;
  opacity: 0.9;
  line-height: 1.4;
}

.call-to-action {
  text-align: center;
  margin-bottom: 50px;
}

.call-to-action h3 {
  font-size: 2.5rem;
  margin-bottom: 30px;
  background: linear-gradient(45deg, #51cf66, #69db7c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.action-items {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
}

.action-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease;
  min-width: 200px;
}

.action-item:hover {
  transform: translateY(-5px);
}

.action-icon {
  font-size: 2rem;
}

.action-text {
  font-size: 1.1rem;
  font-weight: 500;
}

.contact-info {
  text-align: center;
}

.contact-info h3 {
  font-size: 2rem;
  margin-bottom: 30px;
  opacity: 0.9;
}

.contact-methods {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
}

.contact-method {
  text-align: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease;
  cursor: pointer;
  min-width: 150px;
}

.contact-method:hover {
  transform: translateY(-5px);
}

.method-icon {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.method-text {
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

  .summary-section {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .action-items {
    flex-direction: column;
    gap: 20px;
  }

  .contact-methods {
    flex-direction: column;
    gap: 20px;
  }

  .content {
    padding: 20px;
  }
}
</style>
