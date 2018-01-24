<template>
  <div id="case_dialog">
    <el-dialog title="查看详细病例信息"
               :close-on-press-escape="false"
               :before-close="beforeClose"
               :visible="selfVisible">
      <el-form>
        <el-row :gutter="50">
          <el-col :span="5">
            <el-form-item label="医院Id">
              <el-input placeholder="HospitalId" :value="this.cases['HospitalId']" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="病人Id">
              <el-input placeholder="PatientId" :value="this.cases['PatientId']" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="病例Id">
              <el-input :value="this.cases['Id']" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <hr/>
        <el-row :gutter="50">
          <el-col :span="5">
            <el-form-item label="开具时间">
              <el-input placeholder="Date" :value="this.cases['Date']" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="诊疗医生">
              <el-input placeholder="DoctorName" :value="this.cases['DoctorName']" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <hr/>
        <el-form-item label="患病情况">
          <el-input placeholder="Situation" :value="this.cases['Situation']" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="诊疗建议">
          <el-input placeholder="Suggestion" :value="this.cases['Suggestion']" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="处方">
          <el-input placeholder="处方" :value="this.cases['Prescription']" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="诊断">
          <el-input placeholder="诊断" :value="this.cases['Diagnosis']" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import ElDialog from "../../../node_modules/element-ui/packages/dialog/src/component.vue";
  import ElForm from "../../../node_modules/element-ui/packages/form/src/form.vue";
  import ElFormItem from "../../../node_modules/element-ui/packages/form/src/form-item.vue";
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";
  import ElInput from "../../../node_modules/element-ui/packages/input/src/input.vue";

  export default {
    components: {
      ElInput,
      ElCol,
      ElRow,
      ElFormItem,
      ElForm,
      ElDialog
    },
    props: ['caseVisible','patientCase'],
    data() {
      return {
        selfVisible: this.caseVisible,
        cases: this.patientCase,
//        cases: {
//            'Id': '',
//            'HospitalId': 'hospital01',
//            'PatientId': 'patient01',
//            'Date': '2017-7-29',
//            'DoctorName': '刘威',
//            'Situation': '发热',
//            'Suggestion': '服用消炎感冒药，休息2日',
//            'Prescription': '阿资匹林1片/日',
//            'Diagnosis': '感冒',
//          },
      }
    },
    watch: {
      caseVisible (newValue) {
        this.selfVisible = newValue;
      },
      patientCase (newValue){
        this.cases = newValue;
      }
    },
    methods: {
      beforeClose () {
        this.$emit('updateCaseVisible',false);
      },
    }
  }
</script>

<style lang="stylus" scoped>
</style>
