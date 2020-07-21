<template>
  <div class="remote">
    <div class="banner_wrapper">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item>remotePay</el-breadcrumb-item>
        <el-breadcrumb-item>新建链接</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="panel">
      <div class="panel-header panel-header__fix">
        <div class="panel-select-group">
          <span class="panel-header__desc">Please fill in the information</span>
          <div type="primary" class="panel-header-btn" @click="getpath()">Sharing mode guide</div>
        </div>
      </div>

      <div class="panel-body">
        <el-form ref="addForm" :model="addForm" :rules="addFormRules" class="add-form">
          <el-form-item label="productName" class="addform-close-icon">
            <el-input v-model="addForm.productName"></el-input>
            <i class="el-input__icon el-icon-close" @click="addForm.productName = ''" v-if="addForm.productName !== ''"></i>
          </el-form-item>

          <el-form-item label="quantity" prop="quantity">
            <el-input v-model="addForm.quantity"></el-input>
          </el-form-item>

          <el-form-item label="currency">
            <el-select v-model="addForm.currency">
              <el-option v-for="item in currencyList" :key="item.value" :label="item.name" :value="item.value"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="price" class="addform-close-icon" prop="price">
            <el-input v-model="addForm.price"></el-input>
            <i class="el-input__icon el-icon-close" @click="addForm.price = ''" v-if="addForm.price !== ''"></i>
          </el-form-item>

          <el-form-item>
            <el-button @click="addRemoteForm('addForm')">add</el-button>
          </el-form-item>
        </el-form>

        <el-table :data="formData" class="add-table" :show-header="false" style="width: 100%">
          <el-table-column prop="productName"></el-table-column>
          <el-table-column prop="quantity">
            <template slot-scope="scope">
              <button class="reduce" @click="reduceQuantity(scope)">-</button>
              <span class="table-quantity">{{scope.row.quantity}}</span>
              <button class="increase" @click="increaseQuantity(scope)">+</button>
            </template>
          </el-table-column>
          <el-table-column prop="currency"></el-table-column>
          <el-table-column prop="price"></el-table-column>
          <el-table-column prop="delete">
            <template slot-scope="scope">
              <a @click="handleDelete(scope)">{{scope.row.delete}}</a>
            </template>
          </el-table-column>
        </el-table>

        <el-form :model="remoteForm" :rules="remoteFormRules" class="remote-form" label-width="160px" label-position="left">
          <el-form-item label="totalAmount" class="close-icon">
            <el-select v-model="remoteForm.totalCurrency" class="total-amount">
              <el-option v-for="item in currencyList" :key="item.value" :label="item.name" :value="item.value"></el-option>
            </el-select>
            <el-input v-model="remoteForm.totalAmount" class="inputtotal-amount" :disabled="totalAmountStatus"></el-input>
            <i class="el-input__icon el-icon-close" @click="remoteForm.totalAmount = ''" v-if="remoteForm.totalAmount !== '' && !totalAmountStatus"></i>
          </el-form-item>

          <el-form-item label="customerName" class="close-icon">
            <el-input v-model="remoteForm.customerName"></el-input>
            <i class="el-input__icon el-icon-close" @click="remoteForm.customerName = ''" v-if="remoteForm.customerName !== ''"></i>
          </el-form-item>

          <el-form-item label="customerPhone" class="close-icon" prop="customerPhone">
            <el-input v-model="remoteForm.customerPhone"></el-input>
            <i class="el-input__icon el-icon-close" @click="remoteForm.customerPhone = ''" v-if="remoteForm.customerPhone !== ''"></i>
          </el-form-item>

          <el-form-item label="customerEmail" class="close-icon" prop="customerEmail">
            <el-input v-model="remoteForm.customerEmail"></el-input>
            <i class="el-input__icon el-icon-close" @click="remoteForm.customerEmail = ''" v-if="remoteForm.customerEmail !== ''"></i>
          </el-form-item>

          <el-form-item label="paymentDeadline">
            <el-date-picker
              v-model="remoteForm.paymentDeadline"
              type="date"
              :editable="false"
              :clearable="false">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="logisticsMode">
            <el-select v-model="remoteForm.logisticsModeF">
              <el-option v-for="item in logisticsModeFList" :key="item.value" :label="item.name" :value="item.value"></el-option>
            </el-select>
            <el-select v-model="remoteForm.logisticsModeL">
              <el-option v-for="item in logisticsModeLList" :key="item.value" :label="item.name" :value="item.value"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="date">
            <el-date-picker
              v-model="remoteForm.date"
              type="date"
              :editable="false"
              :clearable="false"
              disabled="disabled">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="description" class="count-number">
            <el-input :rows="6" type="textarea" v-model="remoteForm.description" :maxlength="500" @keyup.native="getCount"></el-input>
            <span>{{count}}/500</span>
          </el-form-item>

        </el-form>

        <div class="underline"></div>

        <div class="footer">
          <a>cancel</a>
          <el-button class="remote-link">link</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    // 验证邮箱格式
    const emailValid = (rul, val, cb) => {
      if (!/^[\w-]+[\w-.]*@[a-zA-Z\d-]+(\.[a-zA-Z\d-]+)*\.[a-zA-Z\d]{2,6}$/.test(val) && val !== '') {
        cb(this.$t('overseaForget.invalidEmail'))
      } else {
        cb()
      }
    }
    const numberValid = (rul, val, cb) => {
      if (!/^[0-9]*$/.test(val) && val !== '') {
        cb(this.$t('overseaForget.invalidEmail'))
      } else {
        cb()
      }
    }
    return {
      addForm: {
        productName: '',
        quantity: 1,
        currency: 1,
        price: ''
      },
      formData: [],
      remoteForm: {
        totalCurrency: 1,
        totalAmount: '',
        customerName: '',
        customerPhone: '',
        customerEmail: '',
        paymentDeadline: '',
        logisticsModeF: '',
        logisticsModeL: '',
        date: '',
        description: ''
      },
      count: 0,
      totalAmountStatus: false,
      currencyList: [
        { name: 'HKD', value: 1 }
      ],
      logisticsModeFList: [
        { name: '123', value: 1 }
      ],
      logisticsModeLList: [
        { name: '456', value: 2 }
      ],
      addFormRules: {
        quantity: [
          { validator: numberValid, trigger: 'blur' }
        ],
        price: [
          { validator: numberValid, trigger: 'blur' }
        ]
      },
      remoteFormRules: {
        customerEmail: [
          { validator: emailValid, trigger: 'blur' }
        ],
        customerPhone: [
          { validator: numberValid, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    if (!this.remoteForm.paymentDeadline) {
      this.remoteForm.paymentDeadline = this.getPaymentDeadline()
    }
  },
  watch: {
    formData: {
      handler: function (val, oidval) {
        console.log('val', val)
        console.log('oidval', oidval)
      },
      deep: true
    },
    remoteForm: {
      handler: function (val, oldval) {
        console.log('remoteForm-val', val)
        console.log('remoteForm-oldval', oldval)
      },
      deep: true
    }
  },
  methods: {
    getCount () {
      this.count = this.remoteForm.description.length
    },
    addRemoteForm (addForm) {
      this.$refs[addForm].validate((valid) => {
        if (valid) {
          this.formData.push({
            productName: this.addForm.productName,
            quantity: this.addForm.quantity,
            currency: this.addForm.currency,
            price: this.addForm.price,
            delete: 'Delete'
          })
          this.getQuantity()
        }
      })
    },
    handleDelete (item) {
      this.formData.splice(item.$index, 1)
      this.getQuantity()
    },
    reduceQuantity (item) {
      if (item.row.quantity > 1) {
        item.row.quantity--
      } else {
        item.row.quantity = 1
      }
      this.getQuantity()
    },
    increaseQuantity (item) {
      item.row.quantity++
      this.getQuantity()
    },
    getQuantity () {
      if (this.formData.length > 0) {
        let totalAmount = ''
        for (let i = 0; i < this.formData.length; i++) {
          if (this.formData[i].quantity && this.formData[i].price) {
            totalAmount = Number(totalAmount) + this.formData[i].quantity * this.formData[i].price
          }
        }
        this.remoteForm.totalAmount = totalAmount
      } else {
        this.remoteForm.totalAmount = ''
      }
      (this.remoteForm.totalAmount === '' || this.remoteForm.totalAmount === 0) ? this.totalAmountStatus = false : this.totalAmountStatus = true
    },
    getPaymentDeadline () {
      const date = new Date()
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = (date.getDate() + 7).toString()
      const dateTime = `${year}-${month}-${day}`
      return dateTime
    },
    getpath () {
      this.$router.push({ path: '/table' })
    }
  }
}
</script>

<style lang="scss">
  .remote {
    .panel {
      .panel-header__fix {
        padding-right: 15px;
        line-height:50px;
        .panel-select-group {
          justify-content: space-between;
          line-height: 50px;
          .panel-header__desc {
            font-size: 18px;
            color: #FE9B20;
            float:left;
          }
          .panel-header-btn {
            width: 200px;
          }
        }
      }
      .panel-body {
        padding-left: 25px;
        padding-right: 25px;
        border-bottom: 1px solid #ccc;
        .add-form {
          display: flex;
          margin-bottom: 15px;
          .el-form-item {
            justify-content: space-between;
            margin-right: 10px;
            flex: 3;
          }
          .el-form-item:nth-child(1) {
            flex: 4;
          }
          .addform-close-icon {
            .el-form-item__content {
              position: relative;
              .el-input {
                .el-input__inner {
                  padding-right: 27px;
                }
              }
              .el-icon-close {
                position: absolute;
                top: 18px;
                right: 0;
              }
            }
          }
          .el-form-item:nth-child(5) {
            display: flex;
            flex: 2;
            align-items: flex-end;
            .el-form-item__content {
              width: 100%;
              .el-button {
                width: 100%;
                background-color: #fe9b20;
                border-color: #fe9b20;
                span {
                  color: white;
                }
              }
            }
          }
        }
        .add-table {
          .el-table__body-wrapper {
            .el-table__body {
              colgroup {
                display: flex;
                col {
                  flex: 3;
                  justify-content: space-between;
                  margin-right: 10px;
                }
                col:nth-child(1) {
                  flex: 4;
                }
                col:nth-child(5) {
                  flex: 2;
                }
              }
              .el-table__row {
                display: flex;
                margin-bottom: 10px;
                td {
                  flex: 3;
                  border-bottom: none;
                  .cell {
                    padding-left: 0;
                    padding-right: 0;
                    line-height: 40px;
                    margin-left: 10px;
                    .reduce {
                      border: 1px solid #ccc;
                      border-radius: 21px;
                      height: 21px;
                      width: 21px;
                      background-color: #ffffff;
                      cursor: pointer;
                      outline: none;
                    }
                    .table-quantity {
                      display: inline-block;
                      width: 30px;
                      text-align: center;
                    }
                    .increase {
                      border: 1px solid #ccc;
                      border-radius: 21px;
                      height: 21px;
                      width: 21px;
                      background-color: #ffffff;
                      cursor: pointer;
                      outline: none;
                    }
                  }
                }
                td:nth-child(1) {
                  flex: 4;
                }
                td:nth-child(5) {
                  flex: 2;
                  .cell {
                    margin-left: 0;
                    a {
                      color: #E73B48;
                      &:hover {
                        cursor: pointer;
                      }
                    }
                  }
                }
              }
            }
            .el-table__empty-block {
              display: none;
            }
          }
        }
        .remote-form {
          padding-bottom: 15px;
          .el-input {
            width: 268px;
          }
          .el-form-item {
            margin: 20px 0;
            .total-amount {
              width: 80px;
              .el-input {
                width: 80px;
              }
            }
            .inputtotal-amount {
              width: 179px;
              margin-left: 5px;
            }
          }
          .close-icon {
            .el-form-item__content {
              position: relative;
              .el-input {
                .el-input__inner {
                  padding-right: 27px;
                }
              }
              .el-icon-close {
                position: absolute;
                top: 0;
                left: 234px;
              }
            }
          }
          .count-number {
            .el-form-item__content {
              position: relative;
              span {
                position: absolute;
                right: 10px;
                bottom: 0;
                color: #909297;
              }
            }
          }
        }
        .underline {
          border-bottom: 1px solid #E8E7E6;
        }
        .footer {
          height: 80px;
          display: flex;
          align-items: center;
          a {
            color: #ff9629;
            text-decoration: underline;
            margin-right: 28px;
            &:hover {
              cursor: pointer;
            }
          }
          .remote-link {
            background-color: #7ed321;
            border-color: #7ed321;
            padding-left: 25px;
            padding-right: 25px;
            span {
              color: white;
            }
          }
        }
      }
    }
  }
</style>
