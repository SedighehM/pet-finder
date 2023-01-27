<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { fetchToken, setToken } from "@/utils/auth";
export default {
  name: "App",
  mounted() {
    // We have to set token in login page when login will be added to project
    fetchToken().then(({ data }) => setToken(data.access_token));
  },

  data: () => ({
    //
  }),
};
</script>
