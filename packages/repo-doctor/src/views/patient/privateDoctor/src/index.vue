<template>
  <div class="private-doctor">
    <div class="header">
      <el-button-group>
        <el-button :type="view.model.type === source.state['待接单'] ? 'primary' : '' "
                   @click="changeActive('待接单')">待接单</el-button>
        <el-button :type="view.model.type === source.state['服务中'] ? 'primary' : '' "
                   @click="changeActive('服务中')">服务中</el-button>
        <el-button :type="view.model.type === source.state['接单记录'] ? 'primary' : '' "
                   @click="changeActive('接单记录')">接单记录</el-button>
      </el-button-group>
    </div>

    <div class="body"
         key="待接单"
         v-if="view.model.type === source.state['待接单']">
      <el-form :model="view.model"
               inline>
        <el-form-item label="购买日期">
          <el-date-picker :picker-options="view.rules.pickerOptionsStartForReceive"
                          placeholder
                          v-model="view.modelForReceive.startTime"
                          value-format="yyyy-MM-dd"></el-date-picker>
          <span class="character">一</span>
          <el-date-picker :picker-options="view.rules.pickerOptionsEndForReceive"
                          placeholder
                          v-model="view.modelForReceive.endTime"
                          value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label=" ">
          <el-button @click="get"
                     type="primary">查询</el-button>
        </el-form-item>
      </el-form>

      <peace-table pagination
                   ref="table">
        <peace-table-column label="姓名">
          <template slot-scope="scope">
            <span>{{ scope.row.patientRemarks || scope.row.patientName || scope.row.patientWxName }}</span>
          </template>
        </peace-table-column>
        <peace-table-column label="性别"
                            prop="patientSex"></peace-table-column>
        <peace-table-column label="年龄"
                            prop="patientAge">
          <template slot-scope="scope">{{ scope.row.patientAge || '-' }}</template>
        </peace-table-column>
        <peace-table-column :formatter="(r, c, v) => source.type.find(item=> item.key === v).value"
                            label="服务类型"
                            prop="type"></peace-table-column>
        <peace-table-column label="购买时间"
                            prop="purchaseTime"></peace-table-column>
        <peace-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="showReceiveDialog(scope.row)"
                       type="text">查看详情</el-button>
          </template>
        </peace-table-column>
      </peace-table>
    </div>

    <div class="body"
         key="服务中"
         v-if="view.model.type === source.state['服务中']">
      <el-form :model="view.model"
               inline>
        <el-form-item label="购买日期">
          <el-date-picker :picker-options="view.rules.pickerOptionsStartForService"
                          placeholder
                          v-model="view.modelForService.startTime"
                          value-format="yyyy-MM-dd"></el-date-picker>
          <span class="character">一</span>
          <el-date-picker :picker-options="view.rules.pickerOptionsEndForService"
                          placeholder
                          v-model="view.modelForService.endTime"
                          value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label=" ">
          <el-button @click="get"
                     type="primary">查询</el-button>
        </el-form-item>
      </el-form>

      <peace-table pagination
                   ref="table">
        <peace-table-column label="姓名">
          <template slot-scope="scope">
            <span>{{ scope.row.patientRemarks || scope.row.patientName || scope.row.patientWxName }}</span>
          </template>
        </peace-table-column>
        <peace-table-column label="性别"
                            prop="patientSex"></peace-table-column>
        <peace-table-column label="年龄"
                            prop="patientAge">
          <template slot-scope="scope">{{ scope.row.patientAge || '-' }}</template>
        </peace-table-column>
        <peace-table-column :formatter="(r, c, v) => source.type.find(item=> item.key === v).value"
                            label="服务类型"
                            prop="type"></peace-table-column>
        <peace-table-column label="到期时间"
                            prop="validityTime"></peace-table-column>
        <peace-table-column label="购买时间"
                            prop="purchaseTime"
                            width="160px"></peace-table-column>
        <peace-table-column label="接单时间"
                            prop="acceptTime"
                            width="160px"></peace-table-column>
        <peace-table-column label="服务期间问诊次数"
                            prop="inquiryCount"
                            width="80"></peace-table-column>
        <peace-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="showPatientDetail(scope.row)"
                       type="text">查看详情</el-button>
          </template>
        </peace-table-column>
      </peace-table>
    </div>

    <div class="body"
         key="接单记录"
         v-if="view.model.type === source.state['接单记录']">
      <el-form :model="view.modelForRecord"
               inline>
        <el-form-item label="姓名">
          <el-input placeholder
                    v-model="view.modelForRecord.patientName"></el-input>
        </el-form-item>
        <el-form-item label="接单状态">
          <el-select clearable
                     placeholder="请选择"
                     v-model="view.modelForRecord.orderStatus">
            <el-option :value="0"
                       label="全部"></el-option>
            <el-option :value="3"
                       label="已接单"></el-option>
            <el-option :value="4"
                       label="已拒绝 "></el-option>
            <el-option :value="6"
                       label="已退单"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=" ">
          <el-button @click="get"
                     type="primary">查询</el-button>
        </el-form-item>
      </el-form>

      <peace-table pagination
                   ref="table">
        <peace-table-column label="姓名">
          <template slot-scope="scope">
            <span>{{ scope.row.patientRemarks || scope.row.patientName || scope.row.patientWxName }}</span>
          </template>
        </peace-table-column>
        <peace-table-column label="性别"
                            prop="patientSex"></peace-table-column>
        <peace-table-column label="年龄"
                            prop="patientAge">
          <template slot-scope="scope">{{ scope.row.patientAge || '-' }}</template>
        </peace-table-column>
        <peace-table-column :formatter="(r, c, v) => source.type.find(item=> item.key === v).value"
                            label="服务类型"
                            prop="type"></peace-table-column>
        <peace-table-column label="购买时间"
                            prop="purchaseTime"
                            width="160px"></peace-table-column>
        <peace-table-column :formatter="(r, c, v) => source.orderStatus.find(item=> item.key === v).value"
                            label="接单状态"
                            prop="orderStatus"
                            width="100px"></peace-table-column>
        <peace-table-column label="操作时间"
                            prop="acceptTime"
                            width="160px"></peace-table-column>
        <peace-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="showReceiveDialog(scope.row)"
                       type="text">查看详情</el-button>
          </template>
        </peace-table-column>
      </peace-table>
    </div>

    <peace-dialog :visible.sync="receiveDialog.visible"
                  class="receive-dialog"
                  title="接单意见">
      <el-form :model="receiveDialog.data"
               inline
               label-width="90px">
        <el-form-item label="患者信息：">
          <img :src="receiveDialog.data.patientPhoto"
               style="margin: 0 10px 0 0;" />
          <span style="margin: 0 20px 0 0; font-size: 16px;">{{ receiveDialog.data.patientRemarks || receiveDialog.data.patientName || receiveDialog.data.patientWxName }}</span>
          <span style="margin: 0 20px 0 0; color:rgba(153,153,153,1);">{{ receiveDialog.data.patientSex }}</span>
          <span style="margin: 0 20px 0 0; color:rgba(153,153,153,1);">{{ receiveDialog.data.patientAge && receiveDialog.data.patientAge  }}</span>
          <el-tag :type="receiveDialog.data.orderStatus === 3 ? 'primary' : receiveDialog.data.orderStatus === 4 ? 'danger' : 'info' "
                  size="large"
                  style="position: absolute; left: 370px; border-radius: 60px; width:68px; text-align: center;"
                  v-if="source.orderStatus.find(item=> item.key === receiveDialog.data.orderStatus)">{{ source.orderStatus.find(item=> item.key === receiveDialog.data.orderStatus).value }}</el-tag>
        </el-form-item>

        <hr class="character-dashad" />

        <el-form-item label="服务类型：">
          <span>
            {{
            source.type.find(item=> item.key === receiveDialog.data.type) &&
            source.type.find(item=> item.key === receiveDialog.data.type).value
            }}
          </span>
        </el-form-item>
        <el-form-item label="服务方式：">
          <span>
            {{
            receiveDialog.data.mode === 1 ? '图文问诊' :
            receiveDialog.data.mode === 2 ? '视频问诊' :
            receiveDialog.data.mode === 3 ? '图文问诊、视频问诊' : ''
            }}
          </span>
        </el-form-item>
        <el-form-item label="服务价格：">{{ receiveDialog.data.money }}元</el-form-item>
        <el-form-item label="服务次数：">{{ receiveDialog.data.count === 0 ? '不限' : receiveDialog.data.count }}</el-form-item>
        <el-form-item label="购买时间：">{{ receiveDialog.data.purchaseTime }}</el-form-item>
        <el-form-item label="咨询意向：">{{ receiveDialog.data.orderReason }}</el-form-item>

        <!-- 已接单 -->
        <template v-if="receiveDialog.data.orderStatus === 3">
          <hr class="character-solid" />

          <el-form-item label="接单意见：">同意接单</el-form-item>
          <el-form-item label="操作时间：">{{ receiveDialog.data.acceptTime }}</el-form-item>
        </template>
        <!-- 已拒绝 -->
        <template v-else-if="receiveDialog.data.orderStatus === 4">
          <hr class="character-solid" />

          <el-form-item label="接单意见：">拒绝接单</el-form-item>
          <el-form-item label="拒绝原因：">
            <span>{{ receiveDialog.data.refuseReason }}</span>
          </el-form-item>
          <el-form-item label="操作时间：">{{ receiveDialog.data.acceptTime }}</el-form-item>
        </template>
        <!-- 已退单 -->
        <template v-else-if="receiveDialog.data.orderStatus === 6">
          <hr class="character-solid" />

          <el-form-item label="退单原因：">超时未接单，系统自动退单</el-form-item>
          <el-form-item label="退单时间：">{{ receiveDialog.data.acceptTime }}</el-form-item>
        </template>
        <template v-else>
          <hr class="character-solid" />

          <el-form-item label="接单意见：">
            <el-radio-group v-model="receiveDialog.model.acceptOpinion">
              <el-radio :label="1">通过</el-radio>
              <el-radio :label="2">拒绝</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="拒绝原因："
                        v-if="receiveDialog.model.acceptOpinion === 2">
            <el-input :rows="2"
                      maxlength="255"
                      placeholder="请输入拒绝原因（必填）"
                      show-word-limit
                      style="width: 420px;"
                      type="textarea"
                      v-model="receiveDialog.model.refuseReason"></el-input>
          </el-form-item>

          <div style="text-align: center; margin: 20px 0 0 0;">
            <el-button @click="receiveDialog.visible = false">取消</el-button>
            <el-button @click="confirmReceipt"
                       type="primary">确定</el-button>
          </div>
        </template>
      </el-form>
    </peace-dialog>
  </div>
</template>

<script>
export default {
  inject: ['provideGetTab', 'provideAddTab'],

  data() {
    return {
      view: {
        model: {
          type: (this.$route.params && this.$route.params.type) || 1
        },

        modelForReceive: {
          startTime: '',
          endTime: ''
        },

        modelForService: {
          startTime: '',
          endTime: ''
        },

        modelForRecord: {
          patientName: '',
          orderStatus: 0
        },

        rules: {
          pickerOptionsStartForReceive: {
            disabledDate: (time) => {
              if (this.view.modelForReceive.endTime) {
                return time.getTime() > this.view.modelForReceive.endTime.toDate().getTime() || time.getTime() > Date.now()
              } else {
                return time.getTime() > Date.now()
              }
            }
          },

          pickerOptionsEndForReceive: {
            disabledDate: (time) => {
              if (this.view.modelForReceive.startTime) {
                return time.getTime() < this.view.modelForReceive.startTime.toDate().getTime() || time.getTime() > Date.now()
              } else {
                return time.getTime() > Date.now()
              }
            }
          },

          pickerOptionsStartForService: {
            disabledDate: (time) => {
              if (this.view.modelForService.endTime) {
                return time.getTime() > this.view.modelForService.endTime.toDate().getTime() || time.getTime() > Date.now()
              } else {
                return time.getTime() > Date.now()
              }
            }
          },

          pickerOptionsEndForService: {
            disabledDate: (time) => {
              if (this.view.modelForService.startTime) {
                return time.getTime() < this.view.modelForService.startTime.toDate().getTime() || time.getTime() >= Date.now()
              } else {
                return time.getTime() > Date.now()
              }
            }
          }
        }
      },

      receiveDialog: {
        visible: false,
        model: {
          acceptOpinion: '',
          refuseReason: ''
        },
        data: {}
      },

      source: {
        state: {
          待接单: 1,
          服务中: 2,
          接单记录: 3
        },

        orderStatus: [
          { key: 3, value: '已接单' },
          { key: 4, value: '已拒绝' },
          { key: 6, value: '已退单' }
        ],

        type: [
          { key: 1, value: '周卡/7天' },
          { key: 2, value: '月卡/30天' },
          { key: 3, value: '季卡/90天' },
          { key: 4, value: '半年卡/180天' },
          { key: 5, value: '年卡/365天' }
        ]
      }
    }
  },

  activated() {
    if (this.$route.params && this.$route.params.type) {
      this.view.model.type = this.$route.params.type

      this.get()
    }
  },

  mounted() {
    this.$nextTick(function() {
      this.get()
    })
  },

  computed: {
    getTab() {
      return this.provideGetTab
    },

    addTab() {
      return this.provideAddTab
    }
  },

  methods: {
    changeActive(type) {
      if (this.view.model.type !== this.source.state[type]) {
        this.view.model.type = this.source.state[type]

        this.$nextTick(function() {
          this.get()
        })
      }
    },

    get() {
      if (this.view.model.type === 1) {
        const fetch = Peace.service.privateDoctor.privateDoctorOrderList
        const params = { ...this.view.modelForReceive, type: this.view.model.type }

        this.$refs.table.loadData({
          fetch,
          params
        })
      } else if (this.view.model.type === 2) {
        const fetch = Peace.service.privateDoctor.privateDoctorOrderList
        const params = { ...this.view.modelForReceive, type: this.view.model.type }

        this.$refs.table.loadData({
          fetch,
          params
        })
      } else if (this.view.model.type === 3) {
        const fetch = Peace.service.privateDoctor.acceptRecordList
        const params = this.view.modelForRecord

        this.$refs.table.loadData({
          fetch,
          params
        })
      } else {
        const fetch = Peace.service.privateDoctor.privateDoctorOrderList
        const params = this.view.model

        this.$refs.table.loadData({
          fetch,
          params
        })
      }
    },

    showReceiveDialog(row) {
      this.receiveDialog.model.acceptOpinion = ''
      this.receiveDialog.model.refuseReason = ''
      this.receiveDialog.visible = true

      const params = {
        orderId: row.orderId
      }

      Peace.service.privateDoctor.privateDoctorOrderInfo(params).then((res) => {
        this.receiveDialog.data = res.data.info
      })
    },

    confirmReceipt() {
      if (this.receiveDialog.model.acceptOpinion === '') {
        Peace.util.warning('请选择接单意见')

        return
      }

      const params = {
        orderId: this.receiveDialog.data.orderId,
        acceptOpinion: this.receiveDialog.model.acceptOpinion,
        refuseReason: this.receiveDialog.model.acceptOpinion === 1 ? '' : this.receiveDialog.model.refuseReason
      }

      Peace.service.privateDoctor.confirmReceipt(params).then((res) => {
        this.receiveDialog.visible = false
        this.get()

        Peace.util.success(res.msg)
      })
    },

    showPatientDetail(row) {
      const currentMenu = this.getTab('PatientDetail')
      currentMenu.menuName = row.patientRemarks || row.patientName || row.patientWxName
      currentMenu.menuRoute = '/patient/patientDetail/' + row.patientId

      // 跳转当前路由
      this.addTab(currentMenu)
    }
  }
}
</script>

<style lang="scss" scoped>
.private-doctor {
  .header {
    text-align: center;

    margin: -20px -20px 0;
    background: rgba(249, 249, 249, 1);
    padding: 20px;
  }

  .body {
    padding: 20px 0 20px 0;
  }

  .character {
    display: inline-block;
    width: 40px;
    text-align: center;
    color: #c1c1c1;
  }

  /deep/ .receive-dialog {
    .character-dashad {
      margin: 15px 0;
      border-top: 1px dashed #bfbfbf;
    }

    .character-solid {
      margin: 15px 0;
      border-top: 1px solid #f3f3f3;
    }

    .el-dialog .el-dialog__body {
      padding: 20px 40px;
    }

    .el-form-item--mini .el-form-item__label {
      color: rgba(102, 102, 102, 1);
      padding: 0 5px 0 0;
    }

    .el-form-item--mini.el-form-item {
      margin: 0 0 0 0;
      display: flex;
      align-items: center;
    }

    .el-form-item--mini .el-form-item__content {
      display: flex;
      flex: 1;
      align-items: center;

      font-weight: 600;
      color: rgba(51, 51, 51, 1);

      img {
        border-radius: 50%;
        width: 60px;
        height: 60px;
      }
    }
  }
}
</style>
