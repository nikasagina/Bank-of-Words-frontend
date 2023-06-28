<template>
    <div>
        Logging out...
    </div>
</template>

<script>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
    name: 'LogoutComponent',
    setup() {
        const router = useRouter();
        const store = useStore();

        onMounted(() => {
            store.dispatch('logout');
            router.push('/login');
        });

        return {};
    },
};
</script>