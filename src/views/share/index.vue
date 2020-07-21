<template>
  <div>
    <section class="share">
      <ul class="share_icon">
        <li>
          <a :href="sharemsaage1" title="facebook" target="_blank">
            <img src="./002-facebook.png">
          </a>
        </li>
        <li>
          <a :href="sharemsaage2" title="twitter" target="_blank">
            <img src="./003-twitter.png">
          </a>
        </li>
        <li>
          <!-- <div class="wechant-qrcode"> -->
            <!-- <h4 style="text-align:center;">微信</h4> -->
            <a id="wechat" title="weixin" target="_blank" @click="getQrcode()" class="qrcode-style">
              <img src="./004-linkedin.png">
            </a>
            <!-- <div style="text-align:center;">扫一下二维码，分享到微信。</div> -->
          <!-- </div> -->
        </li>
        <li>
          <a :href="sharemsaage4" title="weibo" target="_blank">
            <img src="./005-google-plus.png">
          </a>
        </li>
        <li>
          <a :href="sharemsaage5" title="qweibo" target="_blank">
            <img src="./006-vk.png">
          </a>
        </li>
        <li>
          <a :href="sharemsaage6" title="人人" target="_blank">
            <img src="./007-tumblr.png">
          </a>
        </li>
        <li>
          <a :href="sharemsaage7" title="weibo" target="_blank">
            <img src="./008-pinterest.png">
          </a>
        </li>
        <li>
          <a :href="sharemsaage8" title="Qzone" target="_blank">
            <img src="./009-logo.png">
          </a>
        </li>
        <li>
          <a :href="sharemsaage9" title="开心" target="_blank">
            <img src="./005-google-plus.png">
          </a>
        </li>
      </ul>
    </section>

    <section>
      <a class="wechat-copy"  href='weixin://'>复制并添加微信号</a>
      <div class="fb-share-button" data-href="https://developers.facebook.com/docs/plugins/" data-layout="button_count" data-size="small"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">分享</a></div>
    </section>
  </div>
</template>

<script async defer crossorigin="anonymous" src="https://connect.facebook.net/zh_CN/sdk.js#xfbml=1&version=v7.0" nonce="ICYcwYyV"></script>
<script>
import QRCode from 'qrcodejs2'
// import '@/assets/font/flaticon.css'
export default {
  data () {
    return {
      sharemsaage1: 'https://www.facebook.com/sharer/sharer.php?u=facebook分享内容',
      sharemsaage2: 'http://twitter.com/share?text=这是分享的title&url=这是分享的地址',
      sharemsaage3: 'http://localhost:8081/#/',
      sharemsaage4: 'https://service.weibo.com/share/share.php?url=微博分享内容&title=分享的内容为：',
      sharemsaage5: 'http://v.t.qq.com/share/share.php?title={title}&url={url}&pic={pic}', // 无法访问
      sharemsaage6: 'http://share.renren.com/share/buttonshare.do?title={title}&link={url}&pic={pic}', // 人人网
      sharemsaage7: 'http://v.t.sina.com.cn/share/share.php?title={title}&url={url}&pic={pic}', // 微博，同sharemsaage4，两个都可以打开
      sharemsaage8: 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={url}&title={title}&pic={pic}', // 分享到qq空间
      sharemsaage9: 'http://www.douban.com/share/service?bm=&image={pic}&href={url}&updated=&name={title}', // 分享到豆瓣
      qr: ''
    }
  },
  methods: {
    getQrcode () {
      this.qr = new QRCode('wechat', {
        width: 100,
        height: 100,
        text: this.sharemsaage3
      })
    }
  }
}
</script>

<style lang="scss">
  .share_icon li {
    float: left;
    list-style: none;
    margin-right: 5px;
  }
  .wechant-qrcode {
    height: 150px;
    width: 150px;
    background-color: black;
    // display: none;
  }
</style>
