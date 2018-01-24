<template>
  <div id="hospital">
    <el-row >

        <OperationNav v-bind:menuItems="navItems" :sendVisible="sendVisible" :receiveVisible="receiveVisible" @updateSendVisible="updateSendVisible" @updateReceiveVisible="updateReceiveVisible"></OperationNav>

      <el-col :span="22">
        <Receive :receiveVisible="receiveVisible" :ws.sync="myws" :patientInfo.sync="receivePatientInfo"></Receive>
      </el-col>
      <br/>
      <el-col :span="22">
        <Send :sendVisible="sendVisible" :patientInfo.sync="rejectPatientInfo" :patientInfoObj.sync="acceptPatientInfo" :ws.sync="myws"></Send>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import OperationNav from './OperationNav.vue'
  import Receive from './Receive'
  import Send from './Send.vue'
  import ElCol from "element-ui/packages/col/src/col";
  import ElRow from "element-ui/packages/row/src/row";

  export default {
    components: {
      ElRow,
      ElCol,
      OperationNav,
      Receive,
      Send,
    },
    data () {
      return {
        sendVisible: true,
        receiveVisible: false,
        receivePatientInfo: {},
        rejectPatientInfo: {},
        acceptPatientInfo: '',
        myws: '',
//        myws: this.init(),
        navItems: [{
          index: 'send',
          content: '发送转诊'
        },{
          index: 'receive',
          content: '接收转诊'
        }, ]
      }
    },
    methods: {
      init(){
        let win = this;
        console.log('hospital before ws create');
//        var myws = new WebSocket('ws://localhost:8889/referral');
//        console.log('hospital after ws create , myws  is ',myws);
//        myws.onopen = function (event) {
//        };
//        myws.onmessage = function (event) {
//          let jsonobj = JSON.parse(event.data);
//          if(jsonobj.operation==="receive"){
//            win.$message({
//              type: 'success',
//              message: '接收到一个新的转诊请求'
//            });
//            console.log('patient info is ', jsonobj.referralProfile);
//            win.receivePatientInfo = jsonobj.referralProfile
//          }else if(jsonobj.operation==="accept"){
//            win.$message({
//              type: 'success',
//              message: '对方同意接收转诊'
//            });
//            console.log('同意转诊,接收到profile ',jsonobj.referralProfile)
//            let tmpPatientInfo = {
//              'id': jsonobj.referralProfile.PatientId,
//              'operation': 'accept'
//            }
//            console.log('tmpPatientId is ',tmpPatientInfo)
//            win.acceptPatientInfo = tmpPatientInfo
//          }else if(jsonobj.operation==="reject"){
//            win.$message.error('对方拒绝接收转诊');
//             win.rejectPatientInfo = jsonobj.referralProfile;
//            console.log("json data is ",jsonobj)
//            console.log('拒绝转诊,接收到profile ',jsonobj.referralProfile)
//            let tmpPatientInfo = {
//              'id': jsonobj.referralProfile.PatientId,
//              'operation': 'reject'
//            }
//            console.log('tmpPatientId is ',tmpPatientInfo)
//            win.acceptPatientInfo = tmpPatientInfo
//          }else {
//            win.$message.error('某些原因导致错误');
//          }
//        };
//        return myws;
      },
      updateSendVisible(newValue) {
        this.sendVisible = newValue
      },
      updateReceiveVisible(newValue) {
        this.receiveVisible = newValue
      },
    }
  }

</script>
