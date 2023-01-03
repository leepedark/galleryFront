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
              <input type="text" class="form-control" id="nickname" placeholder="" required v-model="state.form.rePassword">
              <!--              <div class="invalid-feedback">-->
              <!--                별명을 입력해주세요.-->
              <!--              </div>-->
            </div>
          </div>

          <!--          <div class="mb-3">-->
          <!--            <label for="email">이메일</label>-->
          <!--            <input type="email" class="form-control" id="email" placeholder="you@example.com" required v-model="state.form.email">-->
          <!--            <div class="invalid-feedback">-->
          <!--              이메일을 입력해주세요.-->
          <!--            </div>-->
          <!--          </div>-->

                    <div class="mb-3">
                      <label for="address">주소</label>
                      <input type="text" class="form-control" id="address" placeholder="서울특별시 강남구" required v-model="state.form.address">
                      <div class="invalid-feedback">
                        주소를 입력해주세요.
                      </div>
                    </div>

                    <div class="mb-3">
                      <label for="address2">상세주소<span class="text-muted">&nbsp;(필수 아님)</span></label>
                      <input type="text" class="form-control" id="address2" placeholder="상세주소를 입력해주세요."
                             v-model="state.form.addressDtl">
                    </div>

          <hr class="mb-4">
          <!--          <div class="custom-control custom-checkbox">-->
          <!--            <input type="checkbox" class="custom-control-input" id="aggrement" required>-->
          <!--            <label class="custom-control-label" for="aggrement">개인정보 수집 및 이용에 동의합니다.</label>-->
          <!--          </div>-->
          <div class="mb-4"></div>
          <router-link to="address" class="btn btn-primary">주소검색</router-link>
          <button class="btn btn-primary btn-lg btn-block" type="submit" @click="submit()">가입 완료</button>
<!--        </form>-->
      </div>
    </div>

  </div>
</template>

<script>
import {reactive} from "vue";
import axios from "axios";
import router from "@/scripts/router";

export default {
  name: "Join",

  setup() {
    const state = reactive({
      form: {
        name: "",
        email: "",
        password: "",
        rePassword: "",
        // email: "",
        address: "",
        addressDtl: ""
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

    return {state, submit}
  }

}


</script>