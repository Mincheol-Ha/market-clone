<script>
  import Main from "./pages/Main.svelte";
  import Login from "./pages/Login.svelte";
  import Signup from "./pages/Signup.svelte";
  import Write from "./pages/Write.svelte";
  import Router from "svelte-spa-router";
  import NotFound from "./pages/NotFound.svelte";
  import "./css/style.css";
  import { user$ } from "./store";
  import {
    getAuth,
    GoogleAuthProvider,
    signInWithCredential,
  } from "firebase/auth";
  import { onMount } from "svelte";

  import Loading from "./pages/Loading.svelte";
  import MyPage from "./pages/MyPage.svelte";

  let isLoading = true;

  const auth = getAuth();

  const checkLogin = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      isLoading = false;
      return;
    }

    try {
      const credential = GoogleAuthProvider.credential(null, token);
      const result = await signInWithCredential(auth, credential);
      const user = result.user;
      user$.set(user);
    } catch (err) {
      console.error("로그인 실패:", err);
      localStorage.removeItem("token"); // 잘못된 토큰 제거
    } finally {
      isLoading = false; // 무조건 로딩 종료
    }
  };

  const routes = {
    "/": Main,
    "/signup": Signup,
    "/write": Write,
    "/my": MyPage,
    "*": NotFound,
  };

  onMount(() => checkLogin());
</script>

{#if isLoading}
  <Loading />
{:else if !$user$}
  <Login />
{:else}
  <Router {routes} />
{/if}
