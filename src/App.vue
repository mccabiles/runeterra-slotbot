<template>
  <v-app dark>
    <v-app-bar app color="deep-purple darken" dark>
      <div>
        <div class="text-h6">Slotbot</div>
        <div class="text-caption"> A Legends of Runeterra Randomizer </div>
      </div>
      <v-spacer />
      <div class="text-caption text-right">
        <div>
          Made with ♥ by
          <a class="white--text" href="https://twitter.com/Jzolago">Jzolago</a>
        </div>
        <div>
          Send me a <a class="white--text" href="https://ko-fi.com/jzolago">Ko-fi</a>!
        </div>
      </div>
    </v-app-bar>

    <v-main dark>
      <v-container>
        <v-card>
          <v-card-title>Filters</v-card-title>
          <v-card-text>
            <v-row>
              <v-checkbox
                v-for="(type, i) in options.types"
                :key="i"
                class="mr-4"
                :label="type"
                v-model="types[type]"
              />
            </v-row>
            <v-divider />
            <v-subheader>Regions</v-subheader>
            <v-row>
              <template v-for="(region, i) in options.regions">
                <v-checkbox
                  class="mr-4"
                  :key="i"
                  :label="region"
                  v-model="regions[region]"
                />
              </template>
            </v-row>
            <v-divider />
            <v-subheader>Rarity</v-subheader>
            <v-row>
              <v-checkbox
                v-for="(rarity, i) in options.rarities"
                :key="i"
                class="mr-4"
                :label="rarity"
                v-model="rarities[rarity]"
              />
            </v-row>
            <v-divider />
            <v-subheader>Mana Cost</v-subheader>
            <v-row dense>
              <template v-for="i of 14">
                <v-checkbox
                  class="mr-3"
                  dense
                  :label="String(i - 1)"
                  v-model="mana[i - 1]"
                  :key="i"
                />
              </template>
            </v-row>
            <v-divider class="mb-4" />
            <v-text-field
              dense
              outlined
              label="How many cards?"
              persistent-hint
              hint="Setting to zero will get all cards"
              type="number"
              min="0"
              v-model="count"
            />
          </v-card-text>
          <v-card-actions class="text-right">
            <v-btn color="primary" @click="getRandomCards">
              Randomize!
            </v-btn>
            <v-btn color="gray" text @click="reset">
              Reset Filters
            </v-btn>
          </v-card-actions>
        </v-card>

        <div v-if="loading" class="d-flex justify-center my-8">
          <div class="d-flex flex-column align-center">
            <v-progress-circular indeterminate :size="50" color="primary" />
            <div class="text-body-2"> Randomizing... </div>
          </div>
        </div>

        <template v-else>
          <v-container class="mb-8" v-if="pickedCards.length">
            <div class="text-h6">Selected Cards</div>
            <div class="text-caption">Click cards to remove</div>
            <card-grid :cards="pickedCards" @click="deselectCard" />
          </v-container>

          <v-expansion-panels v-if="filteredCards.length">
            <v-expansion-panel>
              <v-expansion-panel-header>
                Filtered Cards ({{ filteredCards.length }})
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <card-grid :cards="filteredCards" @click="selectCard" />
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </template>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { filterCards } from "./cards.service";
import CardGrid from "./components/CardGrid.vue";

export default {
  name: "App",
  components: {
    CardGrid,
  },
  data: () => ({
    loading: false,
    options: {
      regions: [
        "Bilgewater",
        "Freljord",
        "BandleCity",
        "Ionia",
        "PiltoverZaun",
        "Noxus",
        "ShadowIsles",
        "Demacia",
        "Shurima",
        "Targon",
      ],
      rarities: ["Common", "Rare", "Epic", "Champion"],
      types: ["Unit", "Spell", "Landmark"],
    },
    types: {},
    regions: {},
    mana: {},
    rarities: {},
    count: 1,
    filteredCards: [],
    pickedCards: [],
  }),

  methods: {
    getRandomCards() {
      this.loading = true;
      setTimeout(() => { this.loading = false }, 3000);
      const filtered = filterCards({
        regions: this.regions,
        types: this.types,
        mana: this.mana,
        rarities: this.rarities,
        count: this.count,
      });

      this.filteredCards = [...filtered];
      this.pickedCards = [
        ...filtered.sort(() => 0.5 - Math.random()).slice(0, this.count),
      ];
    },
    deselectCard(index) {
      this.pickedCards.splice(index, 1);
    },
    selectCard(index) {
      this.pickedCards.push(this.filteredCards[index]);
    },
    reset() {
      this.regions = Object.assign({}, {});
      this.mana = Object.assign({}, {});
      this.types = Object.assign({}, {});
      this.rarities = Object.assign({}, {});
    }
  },
};
</script>
