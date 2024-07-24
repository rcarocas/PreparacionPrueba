<template>
  
<NavbarComponent />

  <router-view/>
  
</template>

<script>
import NavbarComponent from '@/components/NavbarComponent.vue';
import { mapActions } from 'vuex';
export default {
  name: "App",
  components: {
    NavbarComponent
  },
  methods: {
    ...mapActions(["initUser"]),
  },
  mounted(){
    this.initUser();
  }
}
</script>

<style lang="scss">

</style>
