<!-- <div class="time">
        <p>{{ timeNow }}</p>
      </div> -->

      <!-- <div class="product-card">
        <div class="product-card_content" v-for="item in formData" :key="item.link_id">
          <div class="product-card_content_top" @click="getIntoDetail(item)">
            <div class="product-card_content_left">
              <span>{{ item.link_url }}</span>
              <span>
                <img src="../assets/link_manage.png" class="tag-read" @click.stop="handleClipboard(item.link_url)">
              </span>
              <span>{{ item.status }}</span>
            </div>
            <div class="product-card_content_center">
              <span>{{ item.time }}</span>
              <span>{{ item.goods_name }}</span>
              
            </div>
          </div>
          <div class="product-card_content_bottom">
            <button @click="getAnotherLink(item.link_id)">{{ $t('linkManage.btn.oneMore') }}</button>
            <button @click="modifyLink(item.link_id)">{{ $t('linkManage.btn.cancel') }}</button>
          </div>
        </div>
        <infinite-loading @infinite="getLinkList" spinner="spiral">
          <span slot="no-more"></span>
        </infinite-loading>
      </div> -->