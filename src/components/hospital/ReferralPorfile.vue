<template>
  <div>
    <el-dialog title='转诊单' id="referralDialog" :close-on-press-escape="false" :visible.sync='referralVisible' :before-close="beforeClose" @open='referralStateChange'>
      <span>
        <el-row>
          <el-col :span="5">
            <p>转诊单号: {{ form.Id }}</p>
          </el-col>
          <el-col :span="6">
            <p>创建日期: {{form.Date}}</p>
          </el-col>
          <el-col :offset="5" :span="4" v-show="state==='look'">
            <p>状态: {{referralState}}</p>
          </el-col>
        </el-row>
        <hr>
        <el-form ref='patientInfo' :model='form' label-width='80px'>
          <el-row>
            <el-col :span="5">
              <el-form-item label='病人姓名'>
                <el-input v-model='form.Name' :disabled='true'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label='性别' label-width='50px'>
                <el-input v-model='form.Gender' :disabled='true'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label='年龄' label-width='50px'>
                <el-input v-model='form.Age' :disabled='true'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label='民族' label-width='50px'>
                <el-input v-model='form.Nationality' :disabled='true'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label='职业' label-width='50px'>
                <el-input v-model='form.Occupation' :disabled='true'></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label='身份证号'>
                <el-input v-model='form.PIN' :disabled='true'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label='籍贯' label-width='50px'>
                <el-input v-model='form.Birthplace' :disabled='true'></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label='联系方式'>
                <el-input v-model='form.Phone' :disabled='true'></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item label='联系地址'>
                <el-input v-model='form.Resident' :disabled='true'></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span v-show='fromVisiable'>
          <hr>
          <el-form ref='fromInfo' :model='form.FromInfo' label-width='80px'>
            <el-row>
              <el-col :span="7">
                <el-form-item label='转往医院' placeholder='请输入转诊医院的名称'>
                  <el-input v-model='form.FromInfo.HospitalName' :disabled='fromDisable'></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label='费用类型'>
                  <el-select v-model='form.FromInfo.PayWay' placeholder='请选择支付方式' :disabled='fromDisable'>
                    <el-option label='医保' value='医保'></el-option>
                    <el-option label='农合' value='农合'></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label='转诊目的'>
                  <el-input v-model='form.FromInfo.ReferralType' placeholder='请选择转诊目的' :disabled='fromDisable'></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="5">
                <el-form-item label='诊疗科室'>
                  <el-input v-model='form.FromInfo.Section' :disabled='fromDisable'></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label='诊疗医生'>
                  <el-input v-model='form.FromInfo.Doctor' :disabled='fromDisable'></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label='联系电话'>
                  <el-input v-model='form.FromInfo.Phone' :disabled='fromDisable'></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="15">
                <el-form-item label='病情简介和注意事项' label-width='150px'>
                  <el-input type='textarea' v-model='form.FromInfo.IllnessState' :disabled='fromDisable'></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="15">
                <el-form-item label='患病家属要求' label-width='150px'>
                  <el-input type='textarea' v-model='form.FromInfo.RelationDemand' :disabled='fromDisable'></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </span>
        <span v-show='toVisiable'>
          <hr>
          <el-form ref='toInfo' :model='form.ToInfo' label-width='80px'>
            <el-row>
              <el-col :span="5">
                <el-form-item label='接诊科室'>
                  <el-input v-model='form.ToInfo.Section' :disabled='toDisable'></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label='接诊医生'>
                  <el-input v-model='form.ToInfo.Doctor' :disabled='toDisable'></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label='联系电话'>
                  <el-input v-model='form.ToInfo.Phone' :disabled='toDisable'></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </span>
        <span v-show="state=='look'&&form.State=='reject'">
          <hr>
          <el-form ref='fromInfo' :model='form' label-width='80px'>
            <el-row>
              <el-col :span="15">
                <el-form-item label='拒绝理由' label-width='80px'>
                  <el-input type='textarea' v-model='form.ToInfo.RejectReason' :disabled='fromDisable'></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </span>
      </span>
      <span slot='footer' class='dialog-footer' v-show='sendVisiable'>
        <el-button @click='beforeClose'>取 消</el-button>
        <el-button type='primary' @click='onSubmit'>确 定</el-button>
      </span>
      <span slot='footer' class='dialog-footer' v-show='receiveVisiable'>
        <el-button @click='dialogVisible = false'>取 消</el-button>
        <el-button type='primary' @click='onAccept'>接 收</el-button>
        <el-button type='primary' @click='onReject'>拒 绝</el-button>
      </span>

      <process-demo ref="processDemo" @close-referral="movePatient" v-if="referralVisible"></process-demo>
    </el-dialog>

  </div>
</template>

<script>
  import ProcessDemo from "../processDemo/ProcessDemo.vue"
  export default {
    components: {
      ProcessDemo
    },
    props: ['referralVisible', 'state', 'ws', 'info'],
    created() {
    },
    data() {
      return {
        hospitalId: 'hospital01',
        demoVisible:true,
        sendData: '',
        form: {
          Id: '',
          Date: '',
          State: '',
          PatientId: '',
          Name: '',
          PIN: '',
          Gender: '',
          Age: 26,
          Birthplace: '',
          Nationality: '',
          Occupation: '',
          Resident: '',
          Phone: '',
          FromInfo: {
            Section: '',
            HospitalName: '',
            Doctor: '',
            Phone: '',
            ReferralType: '',
            RelationDemand: '',
            PayWay: '',
            IllnessState: ''
          },
          ToInfo: {
            Section: '',
            Doctor: '',
            Phone: '',
            RejectReason: ''
          }
        },
        dialogVisible: true,
        fromDisable: false,
        fromVisiable: true,
        toDisable: false,
        toVisiable: true,
        sendVisiable: true,
        receiveVisiable: false
      }
    },
    computed: {
      referralState: function () {
        switch (this.form.State) {
          case 'undeal':
            return '未处理'
          case 'accept':
            return '已接受'
          case 'reject':
            return '已拒绝'
        }
      }
    },
    methods: {
      onSubmit () {
        this.$confirm('确认提交转诊？')
          .then(_ => {
            console.log('确认')
            this.demoVisible=true;
            this.$refs.processDemo.show_tx() // 动画效果
            this.sendData = {
              operation: 'send',
              patientId: this.info,
              referralProfile: this.form
            }
            console.log('确认')
          })
          .catch(_ => {
            console.log('取消')
          })
      },
      onAccept() {
        this.$confirm('确认接受转诊？')
          .then(_ => {
            console.log('确认')
            this.$refs.processDemo.show_tx() //动画效果
            this.sendData = {
              operation: 'accept',
              referralProfile: this.form
            }
            //传数据到后端
            //this.ws.send(JSON.stringify(sendData));
            this.$emit('acceptReferral');
          })
          .catch(_ => {
            console.log('取消')
          })
      },
      onReject() {
        this.$prompt('请输入拒绝理由', '确认拒绝', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({
          value
        }) => {
          this.$refs.processDemo.show_tx()
          this.form.ToInfo.RejectReason = value
          this.sendData = {
              operation: 'reject',
              referralProfile: this.form
            }
          //this.ws.send(JSON.stringify(sendData));
          this.$emit('rejectReferral');
//          this.$message({
//            type: 'success',
//            message: '拒绝理由是: ' + value
//          })
        }).catch(() => {})
      },
      beforeClose() {
        this.$emit('updateReferralVisible')
      },
      movePatient(){
        console.log('send data is ',this.sendData)
        this.ws.send(JSON.stringify(this.sendData))
        this.$emit('updateReferralPatientId');
        this.$emit('updateReferralVisible')
      },
      handleClose(done) {},
      referralStateChange: function () {
        switch (this.state) {
          case 'look':
            let obj = {
                hospitalId: 'hospital01',
                referralId: this.info
            }
            this.fromDisable = true
            this.toDisable = true
            this.fromVisiable = true
            this.toVisiable = !(this.form.State === 'reject')
            this.sendVisiable = false
            this.receiveVisiable = false
            let look_data = {
            Id: 'look',
              Date: 'look',
              State: 'look',
              PatientId: 'look',
              Name: 'look',
              PIN: 'look',
              Gender: 'look',
              Age: 26,
              Birthplace: 'look',
              Nationality: 'look',
              Occupation: 'look',
              Resident: 'look',
              Phone: 'look',
              FromInfo: {
              Section: 'look',
                HospitalName: 'look',
                Doctor: 'look',
                Phone: 'look',
                ReferralType: 'look',
                RelationDemand: 'look',
                PayWay: 'look',
                IllnessState: 'look'
            },
            ToInfo: {
              Section: 'look',
                Doctor: 'look',
                Phone: 'look',
                RejectReason: 'look'
            }
          }
          this.form = look_data
//            this.$http.get('/api/referralInfo/queryReferralByreferralId/'+this.info)
//              .then((res) => {
//                if (res.status === 200) {
//                  this.form = res.data
//                } else {
//                  this.$message.error('获取转诊单数据失败')
//                }
//              }, (er) => {
//              this.$message.error('获取转诊单数据失败')
//            })
            break
          case 'send':
            this.fromDisable = false
            this.toDisable = true
            this.fromVisiable = true
            this.toVisiable = false
            this.sendVisiable = true
            this.receiveVisiable = false
            let send_data = {
            Id: 'send',
              Date: 'send',
              State: 'send',
              PatientId: 'send',
              Name: 'send',
              PIN: 'send',
              Gender: 'send',
              Age: 26,
              Birthplace: 'send',
              Nationality: 'send',
              Occupation: 'send',
              Resident: 'send',
              Phone: 'send',
              FromInfo: {
              Section: 'send',
                HospitalName: 'send',
                Doctor: 'send',
                Phone: 'send',
                ReferralType: 'send',
                RelationDemand: 'send',
                PayWay: 'send',
                IllnessState: 'send'
            },
            ToInfo: {
              Section: 'send',
                Doctor: 'send',
                Phone: 'send',
                RejectReason: 'send'
            }
          }
          this.form = send_data
//            this.$http.get('/api/referral/create/' + this.info).then((res) => {
//              if (res.status === 200) {
//                this.form = res.data
//              } else {
//                this.$message.error('创建转诊单失败')
//              }
//            }, (er) => {
//              this.$message.error('创建转诊单失败')
//            })
            break
          case 'receive':
            this.fromDisable = true
            this.toDisable = false
            this.fromVisiable = true
            this.toVisiable = true
            this.sendVisiable = false
            this.receiveVisiable = true
            let receive_data = {
            Id: 'receive',
              Date: 'receive',
              State: 'receive',
              PatientId: 'receive',
              Name: 'receive',
              PIN: 'receive',
              Gender: 'receive',
              Age: 26,
              Birthplace: 'receive',
              Nationality: 'receive',
              Occupation: 'receive',
              Resident: 'receive',
              Phone: 'receive',
              FromInfo: {
              Section: 'receive',
                HospitalName: 'receive',
                Doctor: 'receive',
                Phone: 'receive',
                ReferralType: 'receive',
                RelationDemand: 'receive',
                PayWay: 'receive',
                IllnessState: 'receive'
            },
            ToInfo: {
              Section: 'receive',
                Doctor: 'receive',
                Phone: 'receive',
                RejectReason: 'receive'
            }
          }
          this.form = receive_data
//            this.$http.get('/api/referralInfo/queryReferralByreferralId/'+this.info).then((res) => {
//              if (res.status === 200) {
//                this.form = res.data
//              } else {
//                this.$message.error('获取转诊单数据失败')
//              }
//            }, (er) => {
//              this.$message.error('获取转诊单数据失败')
//            })
            break
        }
      }
    }
  }

</script>

<style scoped>


</style>
