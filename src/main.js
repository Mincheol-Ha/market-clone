import { mount } from "svelte";
import App from "./App.svelte";

const app = mount(App, {
  target: document.getElementById("app"),
  props: {
    // 필요한 props를 여기에 추가
  },
});
