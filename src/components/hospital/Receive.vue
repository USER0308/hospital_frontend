<template>
  <el-col :span="22" :offset="1" v-show="receiveVisible">
    <!--<Case :message.sync="patientInfo" :ws.sync="ws"></Case>-->
    <el-card class="box_card">
      <h1>待处理</h1>
      <el-table :data="todealTableData" :row-class-name="tableRowClassName" @cell-click="handleCellClick" height="300" width="1850"  >
        <el-table-column label="转诊 id" prop="Id" width="100">
        </el-table-column>
        <el-table-column label="病人姓名" prop="Name" width="100">
        </el-table-column>
        <el-table-column label="转诊状态" prop="State" width="100">
        </el-table-column>
        <el-table-column label="时间" prop="Date" width="150">
        </el-table-column>
        <el-table-column label="转诊目的" prop="FromInfo.ReferralType" width="300">
        </el-table-column>
        <el-table-column label="病情" prop="FromInfo.IllnessState" width="220">
        </el-table-column>
        <el-table-column label="请求转诊医院" prop="FromInfo.HospitalName" width="150">
        </el-table-column>
        <el-table-column label="转出科室" prop="FromInfo.Section" width="100">
        </el-table-column>
        <el-table-column label="请求转诊医生" prop="FromInfo.Doctor" width="100">
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template scope="scope">
            <el-button type="text" @click="dealReferral(scope.row)">处 理 转 诊</el-button>
          </template>
        </el-table-column>
      </el-table>
      <h1>已处理</h1>
      <el-table :data="dealedTableData" :row-class-name="tableRowClassName" @cell-click="showReferral" height="300" width="1050"  >
        <el-table-column label="转诊 id" prop="Id" width="100">
        </el-table-column>
        <el-table-column label="病人姓名" prop="Name" width="100">
        </el-table-column>
        <el-table-column label="转诊状态" prop="State" width="100">
        </el-table-column>
        <el-table-column label="时间" prop="Date" width="150">
        </el-table-column>
        <el-table-column label="转诊目的" prop="FromInfo.ReferralType" width="300">
        </el-table-column>
        <el-table-column label="病情" prop="FromInfo.IllnessState" width="220">
        </el-table-column>
        <el-table-column label="请求转诊医院" prop="FromInfo.HospitalName" width="150">
        </el-table-column>
        <el-table-column label="转出科室" prop="FromInfo.Section" width="100">
        </el-table-column>
        <el-table-column label="请求转诊医生" prop="FromInfo.Doctor">
        </el-table-column>
      </el-table>
    </el-card>
    <InformationDialog :InfoDialogVisible="dialogVisible" :patientId.sync="clickPatientId" @updateDialogVisible="updateDialogVisible"></InformationDialog>
    <ReferralProfile :referralVisible="referralVisible" :info= 'referralInfo' :state.sync = "referralState" :ws = "selfWs" @updateReferralVisible="referralVisible=false" @acceptReferral="accept" @rejectReferral="reject"></ReferralProfile>
  </el-col>
</template>

<script>
  import InformationDialog from './InformationDialog.vue'
  import ReferralProfile from './ReferralPorfile.vue'
  import ElCol from 'element-ui/packages/col/src/col'
  import Case from './Case.vue'
  export default {
    components: {
      Case,
      InformationDialog,
      ReferralProfile
    },
    props: ['receiveVisible', 'ws','patientInfo'],
    data () {
      return {
        caseListVisible: false,
        referralVisible: false,
        dialogVisible: false,
        hospitalId: 'hospital01',
        referralState: 'receive',
        referralInfo: null,
        clickPatientId: '',
        clickRow: '',
        selfWs: this.ws,
        todealTableData: [ {
          "Id": "20171010001",
          "State": "未处理",
          "Date": "20171012",
          "PatientId": "patient01",
          "Name": "王建国",
          "PIN": "142703199701012232",
          "Gender": "男",
          "Age": 20,
          "Resident": "广东省广州市番禹区番禺小区4栋502号",
          "Phone": "13825646512",
          "Birthplace": "陕西省忻州市五寨县",
          "Nationality": "汉",
          "Occupation": "电工",
          "FromInfo": {
            "Section": "内科",
            "HospitalName": "仁和医院",
            "Doctor": "张伟",
            "Phone": "13654681827",
            "ReferralType": "治疗重症",
            "RelationDemand": "要王伟专家负责",
            "PayWay": "医保",
            "IllnessState": "长期高烧不退，各种抗生素均无效"
          },
          "ToInfo": {
            "Section": "内科",
            "Doctor": "王伟",
            "Phone": "13427534816",
            "RejectReason": "王伟专家要出差"
          }
        }],
        dealedTableData: [
          {
            "Id": "referral01",
            "State": "拒绝",
            "Date": "20171012",
            "PatientId": "patient02",
            "Name": "王建国",
            "PIN": "142703199701012232",
            "Gender": "男",
            "Resident": "广东省广州市番禹区番禺小区4栋502号",
            "Phone": "13825646512",
            "Age": 20,
            "Birthplace": "陕西省忻州市五寨县",
            "Nationality": "汉",
            "Occupation": "电工",
            "FromInfo": {
              "Section": "内科",
              "HospitalName": "仁和医院",
              "Doctor": "张伟",
              "Phone": "13654681827",
              "ReferralType": "治疗重症",
              "RelationDemand": "要王伟专家负责",
              "PayWay": "医保",
              "IllnessState": "长期高烧不退，各种抗生素均无效"
            },
            "ToInfo": {
              "Section": "内科",
              "Doctor": "王伟",
              "Phone": "13427534816",
              "RejectReason": "王伟专家要出差"
            }
          }
        ]
      }
    },
    /*
    mounted: function () {
      this.$http.get('/api/referralProfileInfo/queryByHospitalId/'+this.hospitalId)
        .then((res) => {
          if(res.status === 200) {
            this.todealTableData.length = 0 //clear the todealTableData
            for (let i=0;i<res.data.todealReferralProfileInfo.length;i++) {
              let todealReferral = {
                "Id": res.data.todealReferralProfileInfo[i].Id,
                "State": res.data.todealReferralProfileInfo[i].State,
                "Date": res.data.todealReferralProfileInfo[i].Date,
                "PatientId": res.data.todealReferralProfileInfo[i].PatientId,
                "Name": res.data.todealReferralProfileInfo[i].Name,
                "FromInfo": {
                  "Section": res.data.todealReferralProfileInfo[i].FromInfo.Section,
                  "HospitalName": res.data.todealReferralProfileInfo[i].FromInfo.HospitalName,
                  "Doctor": res.data.todealReferralProfileInfo[i].FromInfo.Doctor,
                  "ReferralType": res.data.todealReferralProfileInfo[i].FromInfo.ReferralType,
                  "IllnessState": res.data.todealReferralProfileInfo[i].FromInfo.IllnessState
                },
              }
              if (todealReferral.State === 'undeal') {
                todealReferral.State = '未处理'
              }
              this.todealTableData.push(todealReferral)
            }
            this.dealedTableData.length = 0 //clear the dealedTableData
            for (let i=0;i<res.data.dealedReferralProfileInfo.length;i++) {
              let dealedReferral = {
                "Id": res.data.dealedReferralProfileInfo[i].Id,
                "State": res.data.dealedReferralProfileInfo[i].State,
                "Date": res.data.dealedReferralProfileInfo[i].Date,
                "PatientId": res.data.dealedReferralProfileInfo[i].PatientId,
                "Name": res.data.dealedReferralProfileInfo[i].Name,
                "FromInfo": {
                  "Section": res.data.dealedReferralProfileInfo[i].FromInfo.Section,
                  "HospitalName": res.data.dealedReferralProfileInfo[i].FromInfo.HospitalName,
                  "Doctor": res.data.dealedReferralProfileInfo[i].FromInfo.Doctor,
                  "ReferralType": res.data.dealedReferralProfileInfo[i].FromInfo.ReferralType,
                  "IllnessState": res.data.dealedReferralProfileInfo[i].FromInfo.IllnessState
                },
              }
              if (dealedReferral.State === 'receive') {
                dealedReferral.State = '接受'
              }else if (dealedReferral.State === 'reject') {
                dealedReferral.State = '拒绝'
              }
              this.dealedTableData.push(dealedReferral)
            }
          }else {
            console.log('this.$http.get(\'/api/referralProfileInfo/queryByHospitalId/\',this.hospitalId) return is not 200')
          }
        },(err) => {
          this.$message.error('this.$http.get(\'/api/referralProfileInfo/queryByHospitalId/\',this.hospitalId) return error')
          console.log('/api/referralProfileinfo/queryByHospitalId/ err msg is '+err)
        })
    },*/
    watch: {
      patientInfo (newPaitent){
        if ('Id' in newPaitent) {
          console.log('receive a new patient is',newPaitent);
          var tmpPatient = {
            "Id": newPaitent.Id,
            "State": newPaitent.State,
            "Date": newPaitent.Date,
            "PatientId": newPaitent.PatientId,
            "Name": newPaitent.Name,
            "FromInfo": {
              "Section": newPaitent.FromInfo.Section,
              "HospitalName": newPaitent.FromInfo.HospitalName,
              "Doctor": newPaitent.FromInfo.Doctor,
              "ReferralType": newPaitent.FromInfo.ReferralType,
              "IllnessState": newPaitent.FromInfo.IllnessState
            },
          }
          console.log('tmp patient now is',tmpPatient);
          if (tmpPatient.State === 'undeal'){
            tmpPatient.State = '未处理'
          }
          this.todealTableData.push(tmpPatient);
        }else {
          console.log('id not in newPatient');
        }

      }
    },
    methods: {
      tableRowClassName (row, index) {
        if (row.State === '未处理') {
          return 'info-row'
        } else if (row.State === '拒绝' || row.State === '对方拒绝') {
            return 'negative-row'
          } else if (row.State === '对方接受'||row.State === '接受') {
            return 'positive-row'
          }
      },
      handleCellClick (row, event) {
        if (event.label === '操作') {
          ;//don't need to do anything
        } else {
          // console.log('other cell click');
          //this.$message.error('look'+row.referralId);
          this.clickPatientId = row.PatientId;
          //alert(row.PatientId)
          console.log('row obj is ',row)
          // alert('patient id is '+row.PatientId)
          this.dialogVisible = true
        }
      },
      showReferralCase (rowId) {
        alert('row id is' + rowId)
      },
      updateDialogVisible (val) {
        this.dialogVisible = val
      },
      showReferral(row) {
        //this.$message.error('look'+row.Id);
        this.referralInfo = row.Id;
        this.referralVisible = true
        this.referralState = 'look'

      },
      dealReferral(row) {
        //this.$message.error('receive'+row.Id);
        this.referralVisible = true
        this.referralState = 'receive'
        this.referralInfo = row.Id
        this.clickRow = row
      },
      reject(){
        console.log('this.referralInfo is ',this.referralInfo)
//        this.$message.error('reject' + this.referralInfo);
        for(let i=0;i<this.todealTableData.length;i++){
          if(this.todealTableData[i] == this.clickRow){
            console.log('in for and if');
            let p = this.todealTableData.splice(i,1);
            this.clickRow.State = '拒绝';
            this.dealedTableData.push(this.clickRow);
            return;
          }
        }
//        console.log('choose reject , row is ',this.clickRow)
//        this.dealedTableData.push(this.clickRow);
      },
      accept(){
        console.log('this.referralInfo is ',this.referralInfo)
        //this.$message.error('accept' + this.referralInfo);
        for(let i=0;i<this.todealTableData.length;i++){
          if(this.todealTableData[i] == this.clickRow){
            let p = this.todealTableData.splice(i,1);
            this.clickRow.State = '接受'
            this.dealedTableData.push(this.clickRow);
            return;
          }
        }

      }
    }
  }
</script>
<style>
  .el-table .info-row {
    background: white;
  }

  .el-table .positive-row {
    background: lightgreen;
  }

  .el-table .negative-row {
    background: lightcoral;
  }
</style>
