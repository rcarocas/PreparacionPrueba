<template>
    <div class="backButton">
        <button class="btn btn-info" @click="goBack"><i class="bi bi-arrow-left"></i>
        </button>
    </div>
</template>

<script>
export default {
    name: 'BackButton',
    // props: {},
    data(){
        return {}
    },
    // computed: {},
    methods: {
        goBack(){
            this.$router.go(-1)
        }
    },
    // watch: {},
    // components: {},
    // mixins: [],
    // filters: {},
    // -- Lifecycle Methods
    // -- End Lifecycle Methods
}
</script>

<style scoped lang="scss">
    
</style>