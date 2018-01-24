<template id="processDemo">
    <div>
        <div id="txStoryPanel"><span id="closeTxStoryPos" class="fa fa-close closeTxStory" @click="closeTxStory"></span>
            <div id="txStep1" class="txStepWrap inactiveStep">
                <div class="txStatusWrap">
                    <div class="txStatus"></div>
                </div>
                <div class="txLegend">构建提案</div>
                <!--The invocation needs to be signed and packaged as a proposal.
                This is done here, in the Marbles application. -->
                <!--提案创建过程需要申请人签名并将申请签名打包成一个新的提案。-->
                <!--在这里我们已经通过ＦabricＳＤＫ完成了这项工作。-->
                <div class="txStoryWrap">
                    <div class="marbleWrap">
                        <div id="proposeMarbleStable" title="Your marble tx" class="ball hideBorders leftPos"></div>
                        <div id="proposeMarble" class="ball hideBorders leftPos"></div>
                        <div id="marbleBorderTop" class="ball leftPos"></div>
                        <div id="marbleBorderBottom" class="ball leftPos"></div>
                        <div id="marbleBorderLeft" class="ball leftPos"></div>
                        <div id="marbleBorderRight" class="ball leftPos"></div>
                    </div>
                </div>
                <div class="txDescription"><span>提案创建过程需要申请人签名并将申请签名打包成一个新的提案。</span><br/><span>在这里我们已经通过FabricSDK完成了这项工作。 </span></div>
            </div>
            <!--Next, we send the transaction proposal to our peers for endorsement.
            The peer will simulate the transaction, verify the proposal, and then sign the proposal.
            It is then sent back to Marbles.-->
            <!--下一步，我们传送交易提案给Peer节点，转交给Peer节点背书。-->
            <!--Peer节点会模拟交易，鉴别这个提案并在提案上签名。-->
            <!--随后这个提案消息将会传回SDK。-->
            <div id="txStep2" class="txStepWrap inactiveStep">
                <div class="txStatusWrap">
                    <div class="txStatus"></div>
                </div>
                <div class="txLegend">共识背书</div>
                <div class="txStoryWrap">
                    <div class="marbleWrap">
                        <div id="endorseMarbleStable" title="Your marble tx" class="ball"><span class="fa fa-check"></span></div>
                        <div id="endorseMarble" class="ball"><span class="fa fa-check"></span></div>
                    </div>
                    <div class="peersEndorse" id="peer1">
                        <span title="Another marble tx" class="ball ordererMarbles" style="top: -1.5px;left:-4px;"><span class="fa fa-check hideMe" id="peers1"></span></span>
                    </div>
                    <div class="peersEndorse" id="peer2">
                        <span title="Another marble tx" class="ball ordererMarbles" style="top:47.5px;left:-4px;background-color: #ff8100"><span class="fa fa-check hideMe" id="peers2"></span></span>
                    </div>

                </div>
                <div class="txDescription"><span>下一步，我们传送交易提案给Peer节点，转交给Peer节点背书。 </span><span>Peer节点会模拟交易，鉴别这个提案并在提案上签名。 </span><br/><span>随后这个提案消息将会传回Fabric。</span></div>
            </div>
            <!--Then Marbles will send our endorsed proposal to the orderer.
            The orderer will sequence transactions from throughout the network including ours. -->
            <!--接下来Fabric网络会将已背书的交易提案发送给排序共识服务。-->
            <!--排序共识服务会通过网络将各种交易排序。-->
            <div id="txStep3" class="txStepWrap inactiveStep">
                <div class="txStatusWrap">
                    <div class="txStatus"></div>
                </div>
                <div class="txLegend">排序服务</div>
                <div class="txStoryWrap">
                    <div id="orderBoxStable"><span title="Another marble tx" class="ball ordererMarbles hideMe" id="anotherTx1"><span class="fa fa-check"></span></span><span title="Your marble tx" class="ball ordererMarbles hideMe" id="anotherTx2"><span class="fa fa-check"></span></span><span title="Another marble tx" class="ball ordererMarbles hideMe"><span class="fa fa-check"></span></span>
                        <div id="orderBox">Block</div>
                    </div>
                </div>
                <div class="txDescription"><span>接下来Fabric网络会将已背书的交易提案发送给排序共识服务。</span><br/><span>排序共识服务会通过网络将各种交易排序。 </span></div>
            </div>
            <!--The block containing our transaction is sent from the orderer to our peer.
             Finally it is validated by the peer and then committed to the peer's ledger. -->
            <!--各种交易组成了一个区块，排序共识服务将这个区块发送给各个Peer节点。-->
            <!--最后这些区块被Peer节点查证核实为有效的区块，将这些区块提交到Peer节点各自的区块链账本。-->
            <div id="txStep4" class="txStepWrap inactiveStep">
                <div class="txStatusWrap">
                    <div class="txStatus"></div>
                </div>
                <div class="txLegend">核实提交</div>
                <div class="txStoryWrap">
                    <div id="commitBoxStable" title="Block"><span class="fa fa-search"></span></div>
                </div>
                <div class="txDescription"><span>交易组成了一个区块，排序服务将这个区块发送给各个Peer节点。 </span><br/><span>最后这些区块被Peer节点查证核实为有效的区块，将这些区块提交到Peer节点各自的区块链账本。 </span></div>
            </div>
            <!--注意：为了演示的目的，这个过程的速度将被放慢-->
            <br/>

                <div style="left: 10%;position: absolute;display: inline-block">
                    <button type="button" @click="nextTx">下一步</button> </div>

                <div style="position: absolute;right: 10%;display: inline-block;">
                    <button type="button" @click="rePerform">重新播放</button>
                </div>
              <div class="hint" style="text-align: center">
                <span><br/>*注意：为了演示的目的，这个过程的速度将被放慢</span>
              </div>

            <div id="txStoryErrorWrap"> <span style="fill: #000;" class="fa fa-warning"></span><span id="txStoryErrorTxt">&nbsp;</span></div>
            <div id="doneTxStep" class="stepHelpWrap">
                <h2>交易完成</h2>
                <button type="button" class="closeTxStory" @click="closeTxStory">关闭</button>
            </div>
        </div>
    </div>

</template>

<script>
    /* global $, document, fromLS, set_story_mode */
    /* exported show_tx_step*/
    let story1html = '';
    let story2html = '';
    let story3html = '';
    let story4html = '';
    let stepflag=0;
    // =================================================================================
    // On Load
    // =================================================================================

    // =================================================================================
    // Start Up Fun
    // ================================================================================

    //show the current step from the start up panel
    function show_tx_step(obj, cb_orig){
        var state = obj.state;


        setTimeout(function(){													//wait for initial panel fade in

            //1
            if(state === 'building_proposal'){
                reset();
                $('.closeTxStory').hide();
                $('#txStep1').removeClass('inactiveStep');
                $('#txStep2, #txStep3, #txStep4').addClass('inactiveStep');
                $('#txStep1, #txStep2, #txStep3, #txStep4').removeClass('stepComplete');//reset

                story1_animation(cb_orig);
                stepflag=1;
            }

            //2
            else if(state === 'endorsing'){
                reset();
                $('#txStep1, #txStep2').removeClass('inactiveStep');
                $('#txStep3, #txStep4').addClass('inactiveStep');
                $('#txStep1').addClass('stepComplete');

                story2_animation(cb_orig);																//finally call it here
                stepflag=2;
            }

            //3
            else if(state === 'ordering'){
                $('#txStep1, #txStep2, #txStep3').removeClass('inactiveStep');
                $('#txStep4').addClass('inactiveStep');
                $('#txStep1, #txStep2').addClass('stepComplete');

                story3_animation(cb_orig);
                stepflag=3;
            }

            //4
            else if(state === 'committing'){

                $('#txStep1, #txStep2, #txStep3, #txStep4').removeClass('inactiveStep');
                $('#txStep1, #txStep2, #txStep3').addClass('stepComplete');

                story4_animation(cb_orig);
                stepflag=4;

            }

            //exit
            else if(state === 'finished'){
                $('#txStep1, #txStep2, #txStep3, #txStep4').removeClass('inactiveStep');
                $('#txStep1, #txStep2, #txStep3, #txStep4').addClass('stepComplete');
                $('#commitBoxStable span').removeClass('fa-search').addClass('fa-check');
                $('#doneTxStep').slideDown();
                $('.closeTxStory').show();
                stepflag=5;
            }

            //error states
            else if(state === 'endorsing_failed'){
                $('#txStep1, #txStep2').removeClass('inactiveStep');
                $('#txStep3, #txStep4').addClass('inactiveStep');
                $('#txStep1').addClass('stepComplete');

                $('#txStep2').addClass('stepFailed');
                $('#endorseMarbleStable .fa-check').removeClass('fa-check').addClass('fa-close');
                $('#endorseMarbleStable span').fadeIn();
                $('.closeTxStory').show();
            }
            else if(state === 'ordering_failed'){
                $('#txStep1, #txStep2, #txStep3').removeClass('inactiveStep');
                $('#txStep4').addClass('inactiveStep');
                $('#txStep1, #txStep2').addClass('stepComplete');

                $('#txStep3').addClass('stepFailed');
                $('.closeTxStory').show();
            }
            else if(state === 'committing_failed'){
                $('#txStep1, #txStep2, #txStep3, #txStep4').removeClass('inactiveStep');
                $('#txStep1, #txStep2, #txStep3').addClass('stepComplete');

                $('#txStep4').addClass('stepFailed');
                $('#commitBoxStable span').removeClass('fa-search').addClass('fa-close');
                $('.closeTxStory').show();
            }
        }, 300);
    }

    function reset(){
      $('.peersEndorse').hide();
        $('#txStoryPanel, #tint').fadeIn(300);
        $('#txStep1, #txStep2, #txStep3, #txStep4').removeClass('stepFailed');	//reset
        $('#txStoryErrorTxt').html('');
        $('#txStoryErrorWrap').hide();
        $('#commitBoxStable span').removeClass('fa-check').removeClass('fa-close').addClass('fa-search');
    }

    //1. animate borders to join marble in center
    function story1_animation(cb){
        var dist = 50;
        $('#marbleBorderTop, #marbleBorderBottom, #marbleBorderLeft, #marbleBorderRight').show();
        $('#marbleBorderTop').animate({top: '+=' + dist}, {
            duration: 1800,
            complete: cb
        });
        $('#marbleBorderBottom').animate({top: '-=' + dist}, {duration: 1300});
        $('#marbleBorderLeft').animate({left: '+=' + dist}, {duration: 800});
        $('#marbleBorderRight').animate({left: '-=' + dist}, {duration: 800});
    }

    //1. show marble that will roll
    //2. roll it
    //3. hide rolled marble
    //4. show endorse marble with (icon hidden)
    function story2_animation(cb){
        $('#proposeMarble').show();
        $('#proposeMarbleStable').removeClass('hideBorders');
        var oldStyle= $('#proposeMarble').attr("style");

        var dist1 = $('#txStep1 .txStatusWrap .txStatus').offset();
        var dist2 = $('#txStep2 .txStatusWrap .txStatus').offset();
        var diff = dist2.left - dist1.left;
        $('.peersEndorse').fadeIn(500);
        $('#peers1').hide();
        $('#peers2').hide();
        var dist3 = $('#peer1 .ball').offset();
        var diffCol=dist3.top-dist1.top-35;

        roll_ball('#proposeMarble', diff, function(){
            setTimeout(function () {
                $('#peers1').fadeIn(500);
            },2500);              //peer1 show up
            setTimeout(function () {
                $('#peers2').fadeIn(500);

            },4500);              //peer2 show up
            $('#proposeMarble').animate({
                left: '+=' + diff,
                top:'-='+diffCol
            },2000,function () {
                $('#proposeMarble').attr("style",oldStyle);
            });           //animate up
            $('#proposeMarble').animate({
                left: '+=' + diff,
                top:'+='+diffCol
            },2000,function () {
                $('#proposeMarble').attr("style",oldStyle);
            });           //animate down
            $('#proposeMarble').hide();
            $('#proposeMarble').attr("style",oldStyle);
            $('#endorseMarbleStable').show();
            $('#endorseMarbleStable span').fadeIn(500);
            $('#endorseMarble').fadeIn(500);
            if(cb) cb();
        });

    }

    //1. show the marble that will roll
    //2. roll endorsed marble
    //3. show orderer marbles
    //4. hide rolled marble
    //5. build box around marbles
    function story3_animation(cb){

        var dist2 = $('#txStep2 .txStatusWrap .txStatus').offset();
        var dist3 = $('#txStep3 .txStatusWrap .txStatus').offset();
        var diff = dist3.left - dist2.left;
        var oldStyle=$('#endorseMarble').attr("style");
        roll_ball('#endorseMarble', diff, function(){
          setTimeout(function () {
            $('#endorseMarble').hide();
          },400);

            $('#endorseMarbleStable').show();
            $('#anotherTx1').fadeIn();
            $('#anotherTx2').fadeIn();
            setTimeout(function(){
                $('#orderBoxStable').fadeIn(500);
                setTimeout(function(){
                    $('#orderBoxStable').css('border', '2px #fff solid');
                    setTimeout(function(){
                        $('#endorseMarble').attr("style",oldStyle);
//                        $('#endorseMarble').hide();
                        if(cb) cb();
                    }, 500);
                }, 500);
            }, 300);
        });
        setTimeout(function () {
            $('#orderBox').fadeIn(1000);
        },3500);

    }

    //1. fade in solid box around marbles
    //2. animate it right
    //3. fade in stable box
    //4. hide box we moved
    function story4_animation(cb){
        var dist3 = $('#txStep3 .txStatusWrap .txStatus').offset();
        var dist4 = $('#txStep4 .txStatusWrap .txStatus').offset();
        var diff = dist4.left - dist3.left;
        var oldStyle=$('#orderBox').attr("style");
        setTimeout(function(){
            setTimeout(function(){
                $('#orderBox').animate({left: '+=' + diff}, {
                    duration: 2000,
                    complete: function(){
                        $('#commitBoxStable').show();
                        $('#orderBox').attr("style",oldStyle);
                        $('#orderBox').hide();
                        if(cb) cb();
                    }
                });
            }, 500);
        }, 1000);
    }

    //roll a circle right xxx distance
    function roll_ball(who, move, cb) {
        if(!cb) cb = function(){};

        $(who).animate({left: '+='+move}, {
            duration: 2000,
            step: function(distance) {
                var degree = distance * 360 / move;
                $(who).css('transform','rotate(' + degree + 'deg)');
            },
            complete: cb
        });
    }
    export default {
      mounted:function () {
          // =================================================================================
          // jQuery UI Events
          // =================================================================================

          story1html = $('#txStep1 .txStoryWrap').html();
          story2html = $('#txStep2 .txStoryWrap').html();
          story3html = $('#txStep3 .txStoryWrap').html();
          story4html = $('#txStep4 .txStoryWrap').html();
          $('.peersEndorse').hide();
          stepflag=0;

      },
        methods:{
        closeTxStory:function () {
          $('#txStoryPanel, #tint, #doneTxStep').fadeOut();
          $('.testMarsk').fadeOut();
          this.$emit('close-referral');

          //reset
          setTimeout(function(){
            $('#txStep1 .txStoryWrap').html(story1html);
            $('#txStep2 .txStoryWrap').html(story2html);
            $('#txStep3 .txStoryWrap').html(story3html);
            $('#txStep4 .txStoryWrap').html(story4html);
          }, 500);
          stepflag=0;
        },
            show_tx:function () {
                $('.testMarsk').show();
                show_tx_step({state:"building_proposal"});

            } ,//动画全过程
            nextTx:function () {
                switch (stepflag){
                    case 1:
                        show_tx_step({state:"endorsing"});
                        break;
                    case 2:
                        show_tx_step({state:"ordering"});
                        break;
                    case 3:
                        show_tx_step({state:"committing"});
                        break;
                    case 4:
                        show_tx_step({state:"finished"});
                        break;
                    default:break;
                }
            },
            rePerform:function () {
                switch (stepflag) {
                    case 1:
                        var dist =50;
                        $('#txStep1').removeClass('stepComplete');
                        $('#marbleBorderTop').css({top: '-=' + dist});
                        $('#marbleBorderBottom').css({top: '+=' + dist});
                        $('#marbleBorderLeft').css({left: '-=' + dist});
                        $('#marbleBorderRight').css({left: '+=' + dist});
                        show_tx_step({state:"building_proposal"});
                        break;    //building proposal
                    case 2:
                        $('#txStep2').removeClass('stepComplete');
                        $('#endorseMarble').hide();
                        $('#endorseMarbleStable').hide();
                        $('.peersEndorse').hide();
                        $('#peers1').hide();
                        $('#peers2').hide();
                        setTimeout(function () {
                            show_tx_step({state:"endorsing"});
                        },1000);

                        break;    //endorsing
                    case 3:
                        $('#txStep3').removeClass('stepComplete');
                        $('#anotherTx1').fadeOut();
                        $('#anotherTx2').fadeOut();
                        $('#orderBoxStable').hide();
                        $('#endorseMarble').show();
                        setTimeout(function () {
                            show_tx_step({state: "ordering"});
                        },500);
                        break;    //ordering
                    case 4:
                        $('#txStep4').removeClass('stepComplete');
                        $('#commitBoxStable').hide();
                        $('#orderBox').show();
                        show_tx_step({state: "committing"});
                        break;    //committing
                    default:
                        break;
                }
            }
        }
    }

</script>
<style scoped>
    @import "main.min.css";
  @import "font-awesome-4.5.0/css/fontTesting.css";
</style>
