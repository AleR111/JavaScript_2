const app = new Vue({
  el: '#app',
  data: {
    title: 'Hello Component!',
    counter: 0,
    tabs: ['one', 'two', 'three'],
    currentTab: 'one',
  },
  methods: {
    increase() {
      this.counter++;
    }
  },
  computed: {
    currentComponent() {
      return `component-${this.currentTab}`;
    },
  },
  // watch: {
  //   counter(value, prev) {
  //     console.log(prev, value);
  //   }
  // },
  mounted() {
    // console.log(this);
  },
});
