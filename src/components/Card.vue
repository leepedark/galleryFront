<template>
  <div class="card">
    <div class="card shadow-sm">
      <span class="img" :style="{backgroundImage: `url(${item.imgPath})`}"/>
      <!--    <img :src="item.imgPath"/>-->
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center">
          <ul>
            <small class="text-muted">{{ item.name }}</small>
            <small class="origin">{{ lib.getNumberFormatted(item.price) }}</small>
            <li class="text-muted">할인가{{
                lib.getNumberFormatted(item.price - (item.price * item.discount_per / 100))
              }}원
            </li>
          </ul>
        </div>
        <button class="btn btn-primary" @click="addToCart(item.id)">구매하기</button>
      </div>
    </div>
  </div>

</template>

<script>


import axios from "axios";
import lib from "@/scripts/lib";
import router from "@/scripts/router";
import store from "@/scripts/store";

export default {
  name: "Card",
  props: {
    item: Object
  },
  setup() {

    const addToCart = (itemId) => {
      if (store.state.account.id) {
        axios.post(`/api/cart/items/${itemId}`).then(() => {
          console.log("저장")
        })
      } else {
        window.alert("로그인을 하세요")
        router.push({path: "/login"})
      }
    }
    return {addToCart, lib}
  }
}

</script>

<style scoped>

.card .img {
  display: inline-block;
  width: 100%;
  height: 250px;
  background-size: cover;
  background-position: center;
}

.card .origin {
  text-decoration: line-through;
  margin-left: 20px;
}


</style>