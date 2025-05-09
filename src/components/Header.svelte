<script>
  import { onMount, onDestroy } from "svelte";

  let hour = 0;
  let min = 0;
  let timer;

  const updateTime = () => {
    const now = new Date();
    hour = now.getHours();
    min = now.getMinutes();
  };

  onMount(() => {
    updateTime(); // 초기 값 설정
    timer = setInterval(updateTime, 1000); // 1초마다 업데이트
  });

  onDestroy(() => {
    clearInterval(timer); // 컴포넌트 제거 시 정리
  });
</script>

<header>
  <div class="info-bar">
    <div class="info-bar__time">{hour}:{min}</div>
    <div class="info-bar__icons">
      <img src="assets/chart-bar.svg" alt="chart-bar" />
      <img src="assets/wifi-bar.svg" alt="wifi-bar" />
      <img src="assets/battery-bar.svg" alt="battery-bar" />
    </div>
  </div>
  <div class="menu-bar">
    <div class="menu-bar__location">
      <div>역삼1동</div>
      <div class="menu-bar__location--icon">
        <img src="assets/arrow-down.svg" alt="" />
      </div>
    </div>
    <div class="menu-bar__icons">
      <img src="assets/search.svg" alt="" />
      <img src="assets/menu.svg" alt="" />
      <img src="assets/alert.svg" alt="" />
    </div>
  </div>
</header>

<style>
  .info-bar__time {
    color: blue;
  }
</style>
