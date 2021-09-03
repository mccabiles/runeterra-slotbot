import cards from '../data/cards.json';

export const filterCards = ({
  regions,
  types,
  mana,
  rarities,
}) => {
  const rarityFilters = Object.keys(rarities).filter(rarity => rarities[rarity]);
  const regionFilters = Object.keys(regions).filter(region => regions[region]);
  const typeFilters = Object.keys(types).filter(type => types[type]);
  const manaFilters = Object.keys(mana).filter(cost => mana[cost]).map(cost => Number(cost));

  return cards.filter(card => {
    if (!card.collectible) {
      return false;
    }

    if (rarityFilters.length && 
      !rarityFilters.includes(card.rarityRef)) {
      return false;
    }

    if (regionFilters.length && 
      !card.regionRefs.some(regionRef => regionFilters.includes(regionRef))) {
      return false;
    }

    if (typeFilters.length &&
      !typeFilters.includes(card.type)) {
      return false;
    }

    if (manaFilters.length &&
      !manaFilters.includes(card.cost)) {
      return false;
    }

    return true;
  }).map(({ name, assets }) => ({
    name,
    img: assets[0].gameAbsolutePath
  }));
}
