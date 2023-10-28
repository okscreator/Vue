import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  // хранилище данных
  state: {
    costsData: [],
  },

  // для вычисления производного состояния на основе состояния хранилища
  // для получения данных из хранилища
  getters: {
    getCostsList: state => {
      return state.costsData;
    },
    getMaxId: state =>
      state.costsData.map(({ id }) => id).sort((a, b) => a - b)[
        state.costsData.length - 1
      ],
    getChartData: state => {
      let a = undefined;
      a = state.costsData.reduce((acc, cost) => {
        acc[cost.category] =
          acc[cost.category] === undefined
            ? cost.value
            : acc[cost.category] + cost.value;
        return acc;
      }, {});

      return {
        labels: Object.keys(a),
        datasets: [
          {
            data: Object.values(a),
            backgroundColor: [
              "#41B883",
              "#E46651",
              "#00D8FF",
              "#DD1B16",
              "#DD1654",
              "#DD1744",
            ],
          },
        ],
      };
    },
  },

  //для изменения данных в state
  mutations: {
    setCostsList: (state, payload) => (state.costsData = payload),
    addCostsList: (state, payload) => state.costsData.push(payload),
    removeCostsList: (state, payload) => {
      console.log(JSON.parse(JSON.stringify(payload)));
      state.costsData = state.costsData.filter(el => el.id !== payload.id);
    },
    editCostsList: (state, payload) =>
      (state.costsData = state.costsData.map(cost => {
        if (cost.id === payload.id) {
          return payload;
        } else {
          return cost;
        }
      })),
  },

  // для обмена данными между клиентом-сервером (асинхронных операций)
  actions: {
    async loadCosts({ commit }, onSuccess) {
      const list = await new Promise((resolve, reject) => {
        setTimeout(() => {
          onSuccess();
          resolve([
            { id: 1, date: "20.09.2022", category: "food", value: 1582 },
            { id: 2, date: "15.09.2022", category: "transport", value: 245 },
            { id: 3, date: "22.09.2022", category: "healthcare", value: 780 },
            { id: 4, date: "22.09.2022", category: "healthcare", value: 780 },
            { id: 5, date: "22.09.2022", category: "healthcare", value: 780 },
            { id: 6, date: "22.09.2022", category: "healthcare", value: 780 },
            { id: 7, date: "22.09.2022", category: "healthcare", value: 780 },
            { id: 8, date: "22.09.2022", category: "healthcare", value: 780 },
            { id: 9, date: "22.09.2022", category: "healthcare", value: 780 },
            { id: 10, date: "22.09.2022", category: "healthcare", value: 780 },
          ]);
        }, 1000);
      });
      commit("setCostsList", list);
    },
  },
});
