<template>
  <div class="remote-link">
    <div class="header">
      <van-nav-bar title="Generate Link" left-arrow>
        <template #right>
          <van-icon name="question-o" size="18" />
        </template>
      </van-nav-bar>
    </div>
    <!-- <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          name="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form> -->

    <div class="section-form bgc">
      
      <van-cell-group>
        <van-field v-model="addForm.productName" placeholder="Goods name" />
      </van-cell-group>
      <div class="form-content">
        <div class="input-content">
          <div class="form-content_left">
            <span>Quantity</span>
            <van-field v-model="addForm.quantity" type="digit"/>
          </div>
          <div class="form-content_center">
            <span>Currency</span>
            <van-field
              readonly
              clickable
              name="picker"
              :value="addForm.currency"
              @click="showPicker = true"
            />
            <van-popup v-model="showPicker" position="bottom">
              <van-picker
                show-toolbar
                :columns="columns"
                @confirm="onConfirm"
                @cancel="showPicker = false"
              />
            </van-popup>
          </div>
          <div class="form-content_right">
            <span>Unit price</span>
            <van-field v-model="addForm.price" type="number"/>
          </div>
        </div>
        <van-button size="large" @click="addRemoteForm">add</van-button>
      </div>
    </div>

    <!-- 第二部分 -->

    <van-swipe-cell v-for="item in formData" :key="item.id" @click="deleteitem">
      <p class="product-name">{{ item.productName }}</p>
      <van-divider />
      <div class="product-message">
        <div class="product-message_left">
          <span class="text-color">quantity</span>
          <van-stepper class="text_indent" v-model="item.quantity" theme="round" button-size="28" disable-input />
        </div>
        <div class="product-message_center">
          <span class="text-color">Currency</span>
          <p class="text_indent">{{ item.currency }}</p>
        </div>
        <div class="product-message_right">
          <span class="text-color">Unit price</span>
          <p class="text_indent">{{ item.price }}</p>
        </div>
      </div>
      <template #right>
        <van-button square text="删除" type="danger" class="delete-button" />
      </template>
    </van-swipe-cell><!--:before-close="beforeClose(item.name)"-->
    <div class="remote-form">
      <div class="total-price">
        <p class="total-price_title">Total price</p>
        <van-field
          v-model="remoteForm.totalCurrency"
          readonly
          label="Currency"
          placeholder="输入框内容右对齐"
          input-align="right"
          right-icon="arrow"
          clickable
          @click="showPickerRemote = true"
          class="form-filds"
        />
        <van-popup v-model="showPickerRemote" position="bottom">
          <van-picker
            show-toolbar
            :columns="columns"
            @confirm="onConfirmRemote"
            @cancel="showPickerRemote = false"
          />
        </van-popup>
        <van-field v-model="remoteForm.totalAmount" class="form-filds special-form_total" label="totalAmount" input-align="right" label-width="150" />

        <van-field v-model="remoteForm.customerName" class="form-filds" label="customerName" input-align="right" label-width="150" />
        <van-field v-model="remoteForm.customerPhone" class="form-filds" label="customerPhone" input-align="right" label-width="150" />
        <van-field v-model="remoteForm.customerEmail" class="form-filds" label="customerEmail" input-align="right" label-width="150" />
        <van-field v-model="remoteForm.paymentDeadline" class="form-filds" label="paymentDeadline" input-align="right" label-width="150" @click="showPaymentDate = true" readonly clickable/>
        <van-popup v-model="showPaymentDate" position="bottom">
          <van-datetime-picker
            type="date"
            @confirm="openPaymentDate"
            @cancel="showPaymentDate = false"
          />
        </van-popup>
        <van-field v-model="remoteForm.logisticsMode" class="form-filds" label="logisticsMode" input-align="right" label-width="150" readonly clickable @click="showSendWay = true"/>
        <van-popup v-model="showSendWay" position="bottom">
          <van-picker
            show-toolbar
            :columns="columns"
            @confirm="openSendWay"
            @cancel="showSendWay = false"
          />
        </van-popup>

        <van-field v-model="remoteForm.date" label="date" class="form-filds" input-align="right" label-width="150" @click="showDate = true" readonly clickable/>
        <van-popup v-model="showDate" position="bottom">
          <van-datetime-picker
            type="date"
            @confirm="openDateSelect"
            @cancel="showDate = false"
          />
        </van-popup>
        <p class="total-price_description">Remarks</p>
        <van-field v-model="remoteForm.description" rows="2" autosize type="textarea" maxlength="500" show-word-limit/>

        <p class="test_rem">ceshi</p>

      </div>
    </div>
    
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  data () {
    return {
      addForm: {
        productName: '',
        quantity: 1,
        currency: 1,
        price: '',
        index: ''
      },
      formData: [
        {
          productName: '太阳花',
          quantity: 1,
          currency: 1,
          price: '100',
          index: 1
        },
        {
          productName: '月亮花',
          quantity: 1,
          currency: 1,
          price: '9.8',
          index: 2
        },
      ],
      remoteForm: {
        totalCurrency: 1,
        totalAmount: '',
        customerName: '',
        // customerPhoneRegion: '',
        customerPhone: '',
        customerEmail: '',
        paymentDeadline: '',
        logisticsMode: '',
        date: '',
        description: ''
      },
      value: '',
      // 假数据，真是数据需要服务端返回
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
      showPicker: false,
      showPickerRemote: false,
      showPaymentDate: false,
      showSendWay: false,
      showDate: false
    }
  },
  created () {
    if (!this.remoteForm.paymentDeadline) {
      this.remoteForm.paymentDeadline = this.getPaymentDeadline()
    }
  },
  methods: {
    onConfirm(value, index) {
      this.addForm.currency = value
      this.showPicker = false
    },
    addRemoteForm () {
      this.formData.push({
        productName: this.addForm.productName,
        quantity: this.addForm.quantity,
        currency: this.addForm.currency,
        price: this.addForm.price,
        index: this.formData.length + 1
      })
    },
    handleDelete (item) {
      console.log(item)
      this.formData.splice(item, 1)
    },
    // beforeClose (name) {
    //   console.log('name', name)
    // },
    onConfirmRemote (value, index) {
      this.remoteForm.totalCurrency = value
      this.showPickerRemote = false
    },
    openPaymentDate (value, name) {
      this.remoteForm.paymentDeadline = this.dateCurrect(value)
      this.showPaymentDate = false
    },
    getPaymentDeadline () {
      let date = new Date()
      let year, month, day
      year = date.getFullYear()
      month = date.getMonth() + 1
      day = (date.getDate() + 7).toString()
      let dateTime = `${year}-${month}-${day}`
      return dateTime
    },
    openSendWay (value, index) {
      this.remoteForm.logisticsMode = value
      this.showSendWay = false
    },
    openDateSelect (value, index) {
      this.remoteForm.date = this.dateCurrect(value)
      this.showDate = false
    },
    // 统一处理日期格式
    dateCurrect (item) {
      let date = item
      let year, month, day
      year = date.getFullYear()
      month = date.getMonth() + 1
      day = date.getDate().toString()
      let dateTime = `${year}-${month}-${day}`
      return dateTime
    },
    deleteitem (item) {
      console.log('item', item)
      // console.log('position', position)
      // console.log('name', name)
    }
  }
}
</script>

<style lang="scss">
  .remote-link {
    .bgc {
      background-color: #FFFFFF;
    }
    .header {
    }
    .section-form {
      .form-content {
        padding: 15px;
        .input-content {
          display: flex;
          text-align: center;
          box-sizing: border-box;
          input {
            border: 1px solid #ccc;
            width: 100%;
            text-align: center;
            margin-top: 10px;
          }
          .van-cell {
            padding: 0;
          }
          span {
            color: #606470;
            font-size: 13px;
          }
          .form-content_left {
            flex: 1;
            margin-right: 10px;

          }
          .form-content_center {
            flex: 1;
            margin-right: 10px;
          }
          .form-content_right {
            flex: 1;
          }
        }
        .van-field__body {
          input {
            height: 33px;
          }
        }
        .van-button {
          margin-top: 15px;
          border-color: #FF8100;
          .van-button__text {
            color: #FF8100;
            font-size: 17px;
          }
        }
      }
    }
    .van-swipe-cell {
      margin: 15px 15px 10px 15px;
      background-color: #ffffff;
      .product-name {
        padding: 15px 0 15px 15px;
      }
      .van-divider {
        margin: 0;
      }
      .product-message {
        display: flex;
        text-align: center;
        margin: 15px 18px;
        .text-color {
          color: #606470;
        }
        .text_indent {
          margin-top: 15px;
          .van-stepper__input {
            margin-left: 17px;
            margin-right: 17px;
            font-size: 14px;
          }
        }
        .product-message_left {
          flex: 1;
        }
        .product-message_center {
          flex: 1;
        }
        .product-message_right {
          flex: 1;
        }
      }
      .van-swipe-cell__right {
        .delete-button {
          margin-top: 15px;
          height: 100%;
        }
      }
    }
    .remote-form {
      .total-price {
        .total-price_title {
          color: #606470;
          font-size: 26px;
          margin: 30px 0 20px 28px;
          &:before {
            content: '*';
            color: red;
            margin-top: 5px;
          }
        }
        .form-filds {
          // height: 45px;
        }
        .special-form_total {
          .van-field__value {
            .van-field__body {
              .van-field__control {
                color: #FF8100;
                // font-size: 15px;
              }
            }
          }
        }
        .total-price_description {
          color: #606470;
          font-size: 26px;
          margin: 20px 0 20px 30px;
        }
      }
    }
    .test_rem {
      margin-left: 150px;
    }
  }
</style>
