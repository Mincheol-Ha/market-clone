<script>
  import { onMount } from "svelte";
  import { getDatabase, ref, onValue } from "firebase/database";
  import Nav from "../components/Nav.svelte";
  import Header from "../components/Header.svelte";

  $: items = [];

  const calcTime = (timestamp) => {
    const curTime = new Date().getTime() - 9 * 60 * 60 * 1000;
    const time = new Date(curTime - timestamp);
    const hour = time.getHours();
    const minute = time.getMinutes();
    const second = time.getSeconds();

    const paddedHour = String(hour).padStart(2, "0");
    const paddedMinute = String(minute).padStart(2, "0");

    if (hour > 0) return `${paddedHour}시간 전`;
    else if (minute > 0) return `${paddedMinute}분 전`;
    else if (second > 0) return `${second}초 전`;
    else return "방금 전";
  };

  const db = getDatabase();
  const itemstRef = ref(db, "items/");

  onMount(() => {
    onValue(itemstRef, (snapshot) => {
      const data = snapshot.val();
      items = Object.values(data).reverse();
    });
  });
</script>

<Header />

<main>
  {#each items as item}
    <div class="item-list">
      <div class="item-list__img">
        <img alt={item.title} src={item.imgUrl} />
      </div>
      <div class="item-list__info">
        <div class="item-list__info-title">{item.title}</div>
        <div class="item-list__info-meta">
          {item.place}
          {calcTime(item.insertAt)}
        </div>
        <div class="item-list__info-price">{item.price}</div>
        <div>{item.description}</div>
      </div>
    </div>
  {/each}
  <a class="write-btn" href="#/write">+ 글쓰기</a>
</main>

<Nav location="home" />

<div class="media-info-msg">화면 사이즈를 줄여주세요.</div>
