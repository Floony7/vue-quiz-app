<script setup lang="ts">
import { reactive } from 'vue'
import type { Difficulty, QuestionType } from '@/types/trivia'
import { categories } from '@/utils/categories';

const quizSearch = reactive({
  type: '' as QuestionType | '',
  difficulty: '' as Difficulty | '',
  category: '',
  amount: 10,
})

const handleSubmit = () => {
  console.log('Quiz search parameters:', { ...quizSearch })
}
</script>

<template>
  <main>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="type">Type</label>
        <select id="type" v-model="quizSearch.type" name="type">
          <option value="">Any Type</option>
          <option value="multiple">Multiple Choice</option>
          <option value="boolean">True / False</option>
        </select>
      </div>

      <div>
        <label for="difficulty">Difficulty</label>
        <select id="difficulty" v-model="quizSearch.difficulty" name="difficulty">
          <option value="">Any Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div>
        <label for="category">Category</label>
        <select id="category" v-model="quizSearch.category" name="category">
          <option value="">Any Category</option>
          <option v-for="category in categories" :key="category.value" :value="category.value">
            {{ category.label }}
          </option>
        </select>
      </div>

      <div>
        <label for="amount">Number of questions</label>
        <input
          id="amount"
          v-model.number="quizSearch.amount"
          name="amount"
          type="number"
          min="1"
          max="50"
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  </main>
</template>
