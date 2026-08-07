<script setup lang="ts">
import { RouterLink } from 'vue-router'  
</script>

<template>
    <div class="not-found">
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <RouterLink to="/">Go back to Home</RouterLink>
    </div>
</template>