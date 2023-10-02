import { acceptHMRUpdate, defineStore } from 'pinia'
import type { ServiceJson } from '~/types/ServiceJson'

export const useApiStore = defineStore('api', {
  state: () => ({
    myservices: [] as ServiceJson[],
    category: '',
    categoryList: new Set() as Set<string>,
  }),
  getters: {
    getServices(state): ServiceJson[] {
      return state.myservices
    },
  },
  actions: {
    async fetchServices() {
      if (this.category !== '') {
        // eslint-disable-next-line no-console
        console.log('for this.category is:', this.category)
        try {
          const { data } = await useFetch(
            `/api/services/categories/${this.category}`,
          )
          this.myservices = await data.value?.services as ServiceJson[]
          // eslint-disable-next-line no-console
          console.log(
            ' fetching services by category',
            this.category,
            this.myservices,
          )
        }
        catch (error) {
          // eslint-disable-next-line no-console
          console.log(error)
        }
      }
      if (this.category === '') {
        // eslint-disable-next-line no-console
        console.log('this.category is:', this.category)
        try {
          const { data } = await useFetch('/api/services')
          this.myservices = await data.value?.services as ServiceJson[]
          // eslint-disable-next-line no-console
          console.log(' fetching services', this.myservices)
        }
        catch (error) {
          // eslint-disable-next-line no-console
          console.log(error)
        }
      }
    },

    async fetchCategories() {
      try {
        const { data: categories } = await useFetch('/api/services/categories')
        this.categoryList = new Set((categories.value as { response: string[] })?.response)
      }
      catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      }
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
