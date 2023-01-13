<template>
  <div class="container">
    <h2>게시판</h2>
    <div>총 건수 : <span>{{ boards.totalElements }}</span></div>
    <!--    <form class="form-inline d-flex justify-content-end" method="GET" th:action="@{/board/list}">-->
    <div class="form-group mx-sm-3 mb-2">
      <label for="searchText" class="sr-only">검색</label>
      <input type="text" class="form-control" id="searchText" name="searchText" v-model="searchText">
    </div>
    <button type="submit" class="btn btn-light mb-2" @click="fnGetList('')">검색</button>
    <!--    </form>-->
    <table class="table table-striped">
      <thead>
      <tr>
        <th scope="col">번호</th>
        <th scope="col">제목</th>
        <th scope="col">작성자</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(b, idx) in boards.content" :key="idx">
        <td>{{ b.id }}</td>
        <td v-on:click="fnView(`${b.id}`)">{{ b.title }}</td>
        <td>{{ b.memberId }}</td>
      </tr>
      </tbody>
    </table>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{'disabled': 1 == curPage + 1}">
          <a class="page-link" href="#"
             @click="fnGetList(curPage- 1)"
             tabindex="-1" aria-disabled="true">Previous</a>
        </li>
        <li class="page-item" :class="{'disabled': i == curPage + 1}"
            v-for="(i,idx1) in pages" :key="idx1">
          <button class="page-link" @click="fnGetList(i - 1)">{{ i }}</button>
        </li>
        <li class="page-item" :class="{'disabled': boards.totalPage == curPage + 1}">
          <a class="page-link" href="#"
             @click="fnGetList(curPage + 1)">Next</a>
        </li>
      </ul>
    </nav>
    <div class="text-right">
      <router-link to="/write" type="button" class="btn btn-primary">쓰기</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      requestBody: {}, //리스트 페이지 데이터전송
      boards: {},
      pages: [],
      searchText: "",
      curPage: 0,
      // page: this.$route.query.page ? this.self.query.page : 1,
      // size: this.$route.query.size ? this.self.query.size : 10,
      // keyword: this.$route.query.keyword,
    }
  },

  mounted() {
    this.fnGetList()
  },

  methods: {
    fnGetList(pageNo) {
      axios.get(`api/board/list?page=${pageNo}&&searchText=${this.searchText}`).then((res) => {
        this.boards = res.data
        console.log(res.data)

        this.curPage = this.boards.pageable.pageNumber;
        const startPage = Math.max(1, this.curPage - 4);
        const endPage = Math.min(this.boards.totalPages, this.curPage + 4);
        this.pages = [];

        for (let i = startPage; i <= endPage; i++) {
          this.pages.push(i)
        }
      })
    },

    fnView(idx) {
      this.requestBody.id = idx
      this.$router.push({
        path: '/form',
        query: this.requestBody
      })
    },

    fnWrite() {
      this.$router.push({
        path: './write'
      })
    },

    fnPage(n) {
      if (this.page !== n) {
        this.page = n
        this.fnGetList()
      }
    }
  }
}
</script>

<style>

</style>