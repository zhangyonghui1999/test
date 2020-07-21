<template>
  <div>
    <input id="foo" v-model="value">
    <button class="tag-read" data-clipboard-target="#foo" @click="copy()">立即阅读</button>
  </div>
</template>

<script>
// import clickboard from '@/utils/clickboard'
import Clipboard from 'clipboard'

export default {
  data () {
    return {
      value: '21'
    }
  },
  methods: {
    copy () {
      const clipboard = new Clipboard('.tag-read')
      console.log('clipboard', clipboard)
      clipboard.on('success', e => {
        e.text = '123' + e.text
        console.log('e', e)
        // console.log('复制成功')
        this.$message.success('复制成功')
        // this.$message.error(this.$t('merchant.newMerchant.requiredRule.rule25'))
        // clipboard.destroy()
        e.clearSelection()
      })
      clipboard.on('error', e => {
        console.llog('123')
        clipboard.destroy()
      })
    },
    // copy (text, event) {
    //   clickboard(text, event)
    // }
  }
}
</script>

<style>
</style>
