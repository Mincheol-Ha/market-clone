<script>
  import Nav from "../components/Nav.svelte";
  import { user$ } from "../store";
  import Header from "../components/Header.svelte";

  const logout = () => {
    user$.set(null);
    localStorage.removeItem("token");
  };
</script>

<Header />
<div>나의 당근</div>
<button on:click={logout}>로그아웃</button>
<Nav location="my" />

<style>
  button {
    cursor: ponter;
    border: 1px solid rgba(0, 0, 0, 0.3);
  }
</style>
