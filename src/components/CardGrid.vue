<template>
  <v-row>
    <v-col
      v-for="(card, i) in cards"
      cols="2"
      :key="i"
    >
      <v-img :src="card.img" style="cursor: pointer" @click="$emit('click', i)">
        <template v-slot:placeholder>
          <v-progress-circular indeterminate size="lg" />
        </template>
      </v-img>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'CardGrid',
  props: {
    cards: Array,
  },
}
</script>