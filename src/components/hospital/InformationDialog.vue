<template>
  <div id="information dialog">
    <el-dialog
      title="查看信息"
      @open="beforeOpen"
      :close-on-press-escape="false"
      :before-close="beforeClose"
      :visible="selfVisible"  >
      <el-collapse v-model="activeNames">
        <el-collapse-item title="病人基本信息" name="1">
          <el-form ref="patientInfo" labelWidth='80px'>
            <el-row >
              <el-col :span="5">
                <el-form-item label="姓名" labelWidth='60px'>
                  <el-input placeholder="姓名" v-model="patientInfo.Name" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="病人 id" labelWidth='60px'>
                  <el-input placeholder="id" :value="this.selfPatientId" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="性别" label-width="60px">
                  <el-input placeholder="性别" v-model="patientInfo.Gender" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="年龄" labelWidth="60px">
                  <el-input placeholder="年龄" v-model="patientInfo.Age" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="民族" label-width='60px'>
                  <el-input placeholder="民族" v-model="patientInfo.Nationality" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              </el-row>
              <el-row>

              <el-col :span="5">
                <el-form-item label="婚姻状态" label-width='80px'>
                  <el-input placeholder="婚姻状态" v-model="patientInfo.Marriage" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="联系电话" label-width='80px'>
                  <el-input placeholder="联系电话" v-model="patientInfo.Phone" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="居住地" label-width='60px'>
                  <el-input placeholder="居住地" v-model="patientInfo.Resident" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="5">
                <el-form-item label="职业" label-width='60px'>
                  <el-input placeholder="职业" v-model="patientInfo.Occupation" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" >
                <el-form-item label="身份证" label-width='60px'>
                  <el-input placeholder="身份证" v-model="patientInfo.PIN" :disabled="true"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="7">
                <el-form-item label="籍贯">
                  <el-input placeholder="籍贯" v-model="patientInfo.Birthplace" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          <!--</el-form>-->
          <hr>
          <label>亲属</label>
          <!--<el-form label-width='40px'>-->
            <el-row>
              <el-col :span="6">
                <el-form-item label="亲属姓名" label-width='80px'>
                  <el-input placeholder="亲属姓名" v-model="patientInfo.Relation.Name" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="与病人关系" label-width='90px'>
                  <el-input placeholder="关系" v-model="patientInfo.Relation.Relation" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="亲属联系电话" label-width='105px'>
                  <el-input placeholder="亲属联系电话" v-model="patientInfo.Relation.Phone" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          <!--</el-form>-->
          <hr>
          <label>不良嗜好</label>
          <!--<el-form label-width='50px'>-->
            <el-row>
              <el-col :span="5">
                <el-form-item label="抽烟">
                  <el-input placeholder="抽烟" v-model="patientInfo.Addiction.Smoke" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="嗜酒">
                  <el-input placeholder="嗜酒" v-model="patientInfo.Addiction.Alcohol" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          <!--</el-form>-->
          <hr>
          <label>病史</label>
          <!--<el-form label-width='90px'>-->
            <el-row>
              <el-col :span="12">
                <el-form-item label="过敏原">
                  <el-input placeholder="过敏原" type='textarea' v-model="patientInfo.Anaphylactogen" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="感染病史">
                  <el-input placeholder="感染病史" type='textarea' v-model="patientInfo.InfectiousDiseaseHistory" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="遗传病史">
                  <el-input placeholder="遗传病史" type='textarea' v-model="patientInfo.GeneticDiseaseHistory" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          <!--</el-form>-->
          <hr>
          <label>状态</label>
          <!--<el-form label-width='90px'>-->
            <el-row>
              <el-col :span="8">
                <el-form-item label="当前医院">
                  <el-input placeholder="当前医院" v-model="patientInfo.State.HospitalName" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="转诊状态">
                  <el-input placeholder="转诊状态" v-model="patientInfo.State.Referral" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
        <el-collapse-item title="病例信息" name="2">
          <el-table :data="tableData"  ref="referralTable" @cell-click="handleCellClick" height="300" width="1050"  >
            <el-table-column label="病例 id" prop="Id" width="100">
            </el-table-column>
            <el-table-column label="时间" prop="Date" width="300">
            </el-table-column>
            <el-table-column label="就诊医院" prop="HospitalId" width="100">
            </el-table-column>
            <el-table-column label="医生" prop="DoctorName">
            </el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
    </el-dialog>
    <Case :caseVisible="caseVisible" :patientCase.sync="clickRow" @updateCaseVisible="updateCaseVisible"></Case>
  </div>
</template>

<script>
  import ElCol from "element-ui/packages/col/src/col";
  import ElForm from "../../../node_modules/element-ui/packages/form/src/form.vue";
  import ElFormItem from "../../../node_modules/element-ui/packages/form/src/form-item.vue";
  import ElInput from "../../../node_modules/element-ui/packages/input/src/input.vue";
  import ElRow from "element-ui/packages/row/src/row";
  import Case from "./Case.vue"
  export default {
    components: {
      ElRow,
      ElInput,
      ElCol,
      ElFormItem,
      ElForm,
      Case,
    },
    props: ['InfoDialogVisible','patientId'],
  data() {
    return {
      selfVisible: this.InfoDialogVisible,
      caseVisible: false,
      activeNames: ['1',],
      selfPatientId: this.patientId,
      patientInfo: {
        "Id": "",
        "Marriage": "",
        "Gender": "",
        "Age": 20,
        "Resident": "",
        "Phone": "",
        "PIN": "",
        "Name": "",
        "Birthplace": "",
        "Nationality": "",
        "Occupation": "",
        "Relation": {
          "Name": "",
          "Phone": "",
          "Relation": ""
        },
        "Addiction": {
          "Smoke": "",
          "Alcohol": ""
        },
        "Anaphylactogen": "",
        "InfectiousDiseaseHistory": "",
        "GeneticDiseaseHistory": "",
        "State": {
          "HospitalName": "",
          "Referral": ""
        }
      },
      tableData: [/*{'Id': '120417',
      'Date': '2017',
      'HospitalId': 'hospitalA',
      'DoctorName': '刘威',
      },{
        "HospitalId": "123456789",
        "PatientId": "258369147",
        "Date": "12-05-12",
        "DoctorName": "doc",
        "Situation": "good",
        "Suggestion": "no",
        "Prescription": "none",
        "Diagnosis": "yes",
        "Id": "3389"
      }*/],
      clickRow: {},
    };
  },
  watch: {
    InfoDialogVisible (val) {
        this.selfVisible = val;
    },
    patientId (val) {
      this.selfPatientId = val;
    }
  },
  methods: {
    beforeOpen() {
      //alert(this.selfPatientId);
      //get patient info from backend
      this.$http.get('/patient/queryByPatientId/' + this.selfPatientId)
        .then((res) => {
          if(res.status === 200) {
            this.patientInfo = res.data;
            if (this.patientInfo.State.Referral === 'normal'){
              this.patientInfo.State.Referral = '未转诊'
            }else if (this.patientInfo.State.Referral === 'undeal'){
              this.patientInfo.State.Referral = '待处理'
            }else if (this.patientInfo.State.Referral === 'receive'){
              this.patientInfo.State.Referral = '已接收'
            }else if(this.patientInfo.State.Referral === 'reject'){
              this.patientInfo.State.Referral = '已拒绝'
            }
          }else {
            console.log('this.$http.get(\'/patient/queryByPatientId/\',this.selfPatientId) return not 200');
          }
        },(err) => {
//          this.$message.error('初始化病人个人信息时请求错误！');
          let tmpPatient = {
            "Id": "patient01",
            "Marriage": "未婚",
            "Gender": "男",
            "Age": 20,
            "Resident": "广东省广州市番禹区番禺小区4栋502号",
            "Phone": "13825646512",
            "PIN": "142703199701012232",
            "Name": "王建国",
            "Birthplace": "北京",
            "Nationality": "汉",
            "Occupation": "电工",
            "Relation": {
              "Name": "王伟",
              "Phone": "13653544682",
              "Relation": "父亲"
            },
            "Addiction": {
              "Smoke": "无",
              "Alcohol": "偶尔"
            },
            "Anaphylactogen": "无",
            "InfectiousDiseaseHistory": "无",
            "GeneticDiseaseHistory": "无",
            "State": {
              "HospitalName": "hospital01",
              "Referral": "normal"
            }
          };
          this.patientInfo = tmpPatient;
          if (this.patientInfo.State.Referral === 'normal'){
            this.patientInfo.State.Referral = '未转诊'
          }else if (this.patientInfo.State.Referral === 'undeal'){
            this.patientInfo.State.Referral = '待处理'
          }else if (this.patientInfo.State.Referral === 'receive'){
            this.patientInfo.State.Referral = '已接收'
          }else if(this.patientInfo.State.Referral === 'reject'){
            this.patientInfo.State.Referral = '已拒绝'
          }
        });
        this.$http.get('/api/case/queryByPatientId/' + this.selfPatientId)
        .then((res) => {
          if(res.status === 200){
            this.tableData.length = 0;
            for(let i=0;i<res.data.cases.length;i++){
              let tmpCase = {
                "HospitalId": "",
                "PatientId": "",
                "Date": "",
                "DoctorName": "",
                "Situation": "",
                "Suggestion": "",
                "Prescription": "",
                "Diagnosis": "",
                "Id": ""
              };
              tmpCase.HospitalId = res.data.cases[i].HospitalId;
              tmpCase.PatientId = res.data.cases[i].PatientId;
              tmpCase.Date = res.data.cases[i].Date;
              tmpCase.DoctorName = res.data.cases[i].DoctorName;
              tmpCase.Situation = res.data.cases[i].Situation;
              tmpCase.Suggestion = res.data.cases[i].Suggestion;
              tmpCase.Prescription = res.data.cases[i].Prescription;
              tmpCase.Diagnosis = res.data.cases[i].Diagnosis;
              tmpCase.Id = res.data.cases[i].Id;
              this.tableData.push(tmpCase)
            }
          }else {
            console.log('this.$http.get(\'/api/case/queryByPatientId\',this.selfPatientId) return is not 200');
          }
        },(err) => {
//          this.$message.error('初始化病人病例信息时请求错误！')
            this.tableData.length = 0;
            for(let i=0;i<5;i++){
              let tmpCase = {
                "HospitalId": "XXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                "PatientId": "XXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                "Date": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                "DoctorName": "XXXXXXXXXXXXXXXXXXXXXXXXXXX",
                "Situation": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                "Suggestion": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                "Prescription": "XXXXXXXXXXXXXXXXXXXXXXXXXXX",
                "Diagnosis": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                "Id": "XXXXXXXXXXXXXXX"
              };
              this.tableData.push(tmpCase)
            }
        });
    },
    beforeClose() {
      this.$emit('updateDialogVisible',false);
    },
    handleCellClick(row,event) {
      for(let i=0;i<this.tableData.length;i++) {
        if(this.tableData[i].Id === row.Id) {
          this.clickRow = this.tableData[i];
          break;
        }
      }
      this.caseVisible = true;
      this.InfoDialogVisible = false
    },
    updateCaseVisible(val){
      this.caseVisible = val;
      this.InfoDialogVisible = true
    }
  },
}
</script>

