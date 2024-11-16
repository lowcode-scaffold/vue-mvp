import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { propxyWindowMethod } from "./utils/electronWebService";
import { addElectronWebWebEventListener } from "./utils/electronWebService/request";

propxyWindowMethod();

addElectronWebWebEventListener();

createApp(App).use(router).mount("#app");
