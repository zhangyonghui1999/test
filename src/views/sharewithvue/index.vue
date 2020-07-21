<template>
  <div class="hello">
    <Facebook :url="url" scale="3"></Facebook>
    <twitter :url="url" title="Check me on Github" scale="3"></twitter>
    <linkedin :url="url" scale="3"></linkedin>
    <telegram :url="url" scale="3"></telegram>
    <whats-app :url="url" title="Hello" scale="3"></whats-app>
    <pinterest :url="url" scale="3"></pinterest>
    <reddit :url="url" scale="3" title="My Github"></reddit>
    <google :url="url" scale="3"></google>
    <email :url="url" subject="Hello" scale="3"></email>
  </div>
</template>

<script>
import {
  Facebook,
  Twitter,
  Linkedin,
  Pinterest,
  Reddit,
  Telegram,
  WhatsApp,
  Email,
  Google
} from 'vue-socialmedia-share'
export default {
  name: 'HelloWorld',
  components: {
    Facebook,
    Twitter,
    Linkedin,
    Pinterest,
    Reddit,
    Telegram,
    WhatsApp,
    Email,
    Google
  },
  data () {
    return {
      url: 'https://github.com/mbj36'
    }
  }
}
</script>

<style lang="scss" scoped>
// h1,
// h2 {
//   font-weight: normal;
// }
// ul {
//   list-style-type: none;
//   padding: 0;
// }
// li {
//   display: inline-block;
//   margin: 0 10px;
// }
// a {
//   color: #42b983;
// }
.hello > span {
  padding: 1em;
}
.hello {
  font-size: 12px;
  span {
    svg {
      height: 12;
      width: 12;
    }
  }
}
// svg {
//   height: 10;
//   width: 10;
// }
</style>
