<template>
  <div class="bg-indigo-100 px-3 py-1 rounded-md flex items-center" :class="{ 'bg-red-100': timeRemaining < 300 }">
    <svg class="h-5 w-5 mr-1" :class="{ 'text-red-600': timeRemaining < 300, 'text-indigo-600': timeRemaining >= 300 }" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span :class="{ 'text-red-600 font-bold': timeRemaining < 300, 'text-indigo-600': timeRemaining >= 300 }">
      {{ formattedTime }}
    </span>
  </div>
</template>

<script setup>
const props = defineProps({
  timeRemaining: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['time-expired'])

const formattedTime = computed(() => {
  const minutes = Math.floor(props.timeRemaining / 60)
  const seconds = props.timeRemaining % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
})

watch(() => props.timeRemaining, (newValue) => {
  if (newValue <= 0) {
    emit('time-expired')
  }
})
</script>