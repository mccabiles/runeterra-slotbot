<template>
  <v-app dark>
    <v-app-bar app color="primary" dark>
      Slotbot: LOR Randomizer
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
          </v-card-actions>
        </v-card>
        <v-container class="mb-8">
          <div class="text-h6">Selected Cards</div>
          <v-row>
            <v-col
              v-for="(card, i) in pickedCards"
              cols="2"
              :key="i"
              @click="deselectCard(i)"
            >
              <v-img :src="card.img">
                <template v-slot:placeholder>
                  <v-progress-circular indeterminate size="lg" />
                </template>
              </v-img>
            </v-col>
          </v-row>
        </v-container>

        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header>
              Filtered Cards ({{ filteredCards.length }})
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
                <v-col
                  cols="2"
                  v-for="(card, i) in filteredCards"
                  :key="i"
                  @click="selectCard(i)"
                >
                  <v-img :src="card.img">

                  </v-img>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { filterCards } from "./cards.service";

export default {
  name: "App",

  data: () => ({
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
  },
};
</script>
