// create a pinia favorites store

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favorites: [] as string[],
  }),
  getters: {
    favoritesCount: state => state.favorites.length,
    isFavorite: state => (id: string) => state.favorites.includes(id),
  },
  actions: {
    addFavorite(id: string) {
      this.favorites.push(id)
      // eslint-disable-next-line no-console
      console.log('favorites are:', this.favorites)
    },
    removeFavorite(id: string) {
      this.favorites.splice(this.favorites.indexOf(id), 1)
    },
  },
})
