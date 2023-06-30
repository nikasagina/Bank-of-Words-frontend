<template>
    <div class="container mx-auto py-10">
        <h1 class="text-4xl font-bold mb-4">Welcome to Bank of Words!</h1>
        <p class="text-lg mb-4">Improve your vocabulary skills and build your personal "Bank of Words". Designed for non-native language learners, our platform helps you study and memorize foreign words through an innovative repetition algorithm and flashcard system.</p>
        <h2 class="text-2xl font-semibold mb-2">Key Features:</h2>
        <ul class="list-disc list-inside text-lg mb-4">
            <li>Log in and access your personal "bank of words" from any device.</li>
            <li>Use flashcards to study new words and commit them to memory.</li>
            <li>Follow our unique algorithm for repeating words at optimal intervals.</li>
            <li>Track your progress and view personal statistics.</li>
            <li>Manually add new words or import them from books.</li>
            <li>Work on spelling improvement.</li>
        </ul>
        <p class="text-lg mb-4">If you're already a registered user, please log in to continue. Otherwise, please sign up to create an account.</p>
        <router-link to="/register" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">Sign Up</router-link>
        <router-link to="/login" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Log In</router-link>
    </div>
</template>

<script>
export default {
    name: 'WelcomeComponent',
};
</script>

<style>
/* Add custom styles for the component here */
</style>