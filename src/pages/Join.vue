<template>
  <div class="container">
    <div class="input-form-backgroud row">
      <div class="input-form col-md-12 mx-auto">
        <h4 class="mb-3">회원가입</h4>
        <!--        <form class="validation-form" novalidate>-->
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="name">이름</label>
            <input type="text" class="form-control" id="name" placeholder="" required v-model="state.form.name">
            <!--              <div class="invalid-feedback">-->
            <!--                이름을 입력해주세요.-->
            <!--              </div>-->
          </div>
          <div class="col-md-6 mb-3">
            <label for="email">ID</label>
            <input type="text" class="form-control" id="email" placeholder="" required v-model="state.form.email">
            <!--              <div class="invalid-feedback">-->
            <!--                별명을 입력해주세요.-->
            <!--              </div>-->
          </div>
          <div class="col-md-6 mb-3">
            <label for="name">비밀번호</label>
            <input type="text" class="form-control" id="name" placeholder="" required v-model="state.form.password">
            <!--              <div class="invalid-feedback">-->
            <!--                이름을 입력해주세요.-->
            <!--              </div>-->
          </div>
          <div class="col-md-6 mb-3">
            <label for="nickname">비밀번호 재확인</label>
            <input type="text" class="form-control" id="nickname" placeholder="" required
                   v-model="state.form.rePassword">
            <!--              <div class="invalid-feedback">-->
            <!--                별명을 입력해주세요.-->
            <!--              </div>-->
          </div>
        </div>

        <hr class="mb-4">
        <!--          <div class="custom-control custom-checkbox">-->
        <!--            <input type="checkbox" class="custom-control-input" id="aggrement" required>-->
        <!--            <label class="custom-control-label" for="aggrement">개인정보 수집 및 이용에 동의합니다.</label>-->
        <!--          </div>-->
        <div class="mb-4"></div>

        <div class="daummap">
          <button @click="showApi">주소검색</button>
          <div class="col-md-6 mb-3">
            <label for="postNo">우편번호</label>
            <input type="text" class="form-control" id="postNo" required v-model="state.form.zip">
          </div>
          <div class="col-md-6 mb-3">
            <label for="basic">기본주소</label>
            <input type="text" class="form-control" id="basic" required v-model="state.form.addr1">
          </div>
          <div class="col-md-6 mb-3">
            <label for="dtl">상세주소</label>
            <input type="text" class="form-control" id="dtl" required v-model="state.form.addr2">
          </div>
          <div ref="embed"></div>
          <!--        <Address v-model="state.form"/>-->

          <!--          <router-link to="address" class="btn btn-primary">주소검색</router-link>-->
          <button class="btn btn-primary btn-lg btn-block" type="submit" @click="submit()">가입 완료</button>
          <!--        </form>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {reactive} from "vue";
import axios from "axios";
import router from "@/scripts/router";
// import Address from "@/components/Address.vue";

export default {
  name: "Join",
  // components: {Address},

  setup() {
    const state = reactive({
      form: {
        name: "",
        email: "",
        password: "",
        rePassword: "",
        zip: "",
        addr1: "",
        addr2: ""
      }
    })

    const submit = () => {
      if (state.form.password == state.form.rePassword) {
        axios.post("/api/account/join", state.form).then(() => {
          window.alert("가입이 완료되었습니다. 로그인하세요")
          router.push({path: "/login"})
        })
      } else {
        window.alert("비밀번호를 확인하세요")
        state.form.rePassword = "";
      }
    }
    const showApi = () => {
      new window.daum.Postcode({
        oncomplete: (data) => {
          // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

          // 도로명 주소의 노출 규칙에 따라 주소를 조합한다.
          // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
          let fullRoadAddr = data.roadAddress; // 도로명 주소 변수
          let extraRoadAddr = ''; // 도로명 조합형 주소 변수

          // 법정동명이 있을 경우 추가한다. (법정리는 제외)
          // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
          if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
            extraRoadAddr += data.bname;
          }
          // 건물명이 있고, 공동주택일 경우 추가한다.
          if (data.buildingName !== '' && data.apartment === 'Y') {
            extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
          }
          // 도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
          if (extraRoadAddr !== '') {
            extraRoadAddr = ' (' + extraRoadAddr + ')';
          }
          // 도로명, 지번 주소의 유무에 따라 해당 조합형 주소를 추가한다.
          if (fullRoadAddr !== '') {
            fullRoadAddr += extraRoadAddr;
          }

          // 우편번호와 주소 정보를 해당 필드에 넣는다.
          // this.zip = data.zonecode; //5자리 새우편번호 사용
          state.form.zip = data.zonecode;
          // this.addr1 = fullRoadAddr;
          state.form.addr1 = fullRoadAddr;
          // console.log(state.form.addr1)
        }
      }).open() // 팝업,  embed(this.$refs.embed)는 임베디드
    }

    return {state, submit, showApi}
  }

}


</script>