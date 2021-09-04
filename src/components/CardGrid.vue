<template>
  <v-row>
    <template v-if="cards.length">
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
    </template>
    <v-col class="text-center" cols="12" v-else>
      There are no cards yet.
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