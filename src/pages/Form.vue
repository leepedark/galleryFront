<template>
  <!--  <div class="board-detail">-->
  <!--    <div class="board-contents">-->
  <!--      <h3>{{ title }}</h3>-->
  <!--      <div>-->
  <!--        <strong class="w3-large">{{ author }}</strong>-->
  <!--        <br>-->
  <!--        <span>{{ created_at }}</span>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--    <div class="board-contents">-->
  <!--      <span>{{ contents }}</span>-->
  <!--    </div>-->

  <label for="title">제목</label>
  <input type="text" class="form-control" v-model="title">
  <!--  </div>-->

  <div class="form-group">
    <label for="content">내용</label>
    <textarea class="form-control" id="content" rows="3" v-model="contents"></textarea>
  </div>

  <div class="common-buttons">
    <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnUpdate">수정</button>&nbsp;
    <button type="button" class="w3-button w3-round w3-red" v-on:click="fnDelete">삭제</button>&nbsp;
    <button type="button" class="w3-button w3-round w3-gray" v-on:click="fnList">목록</button>
  </div>
</template>

<script>


import axios from "axios";

export default {
  name: "Form",
  data() {
    return {
      requestBody: this.$route.query,
      idx: this.$route.query.id,
      title: '',
      author: '',
      contents: '',
      created_at: ''
    }
  },

  mounted() {
    this.fnGetView()
  },

  methods: {
    fnGetView() {
      axios.get('api/board/' + this.idx, {params: this.requestBody}).then((res) => {
        this.title = res.data.title
        this.author = res.data.author
        this.contents = res.data.content
        this.created_at = res.data.createAt
      }).catch((err) => {
        if (err.message.indexOf('Network Error') > -1) {
          alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
        }
      })
    },
    fnList() {
      delete this.requestBody.id
      this.$router.push({
        path: '/board',
        query: this.requestBody
      })
    },
    fnUpdate() {
      this.$router.push({
        path: '/write',
        query: this.requestBody
      })
    },
    fnDelete() {
      if (!confirm("삭제하시겠습니까?")) return

      axios.delete('api/board/' + this.idx, {})
          .then(() => {
            alert('삭제되었습니다.')
            this.fnList();
          }).catch((err) => {
        console.log(err);
      })
    }
  }

}
</script>