<template>
  <div class="cart">
    <div class="container">
      <ul>
<!--        {{state.items.length}}-->
        <li v-for="(item,idx) in state.items" :key="idx">
          <input type="checkbox" v-model="state.selected" :value="item"/>
          <img :src="item.imgPath" alt="이미지"/>
                    <span>{{item.id}}</span>
          <span class="name"> {{ item.name }}</span>
          <span class="price">{{ lib.getNumberFormatted(item.price - (item.price * item.discount_per / 100)) }}원</span>
          <i class="fa fa-trash" @click="remove(item.id)"></i>

        </li>
      </ul>
      <router-link to="order" class="btn btn-primary"  v-if="state.items.length > 0" @click="purchase">구매하기</router-link>
    </div>

  </div>

</template>

<script>
import {reactive} from "vue";
import axios from "axios";
import store from "@/scripts/store";
import lib from "@/scripts/lib";

export default {
  name: "Cart",

  setup() {
    const state = reactive({
      items: [],
      selected: []
    })

    const load = () => {
      axios.get("api/cart/items").then((res) => {
        state.items = res.data;

      })
    }

    const remove = (itemId) => {
      axios.delete(`/api/cart/items/${itemId}`).then(() => {
            console.log("삭제완료" + itemId);
            load();
          }
      )
    }

    const purchase = () => {
      store.commit("setCart", state.selected)
    }

    load();
    return {state, remove, purchase, lib}
  }
}

</script>

<style scoped>

.cart ul {
  list-style: none;
  margin: 0;
  margin-bottom: 0;
}

.cart ul li {
  border: 1px solid #eee;
  margin-top: 25px;
  margin-bottom: 25px;
}

.cart ul li img {
  width: 150px;
  height: 150px;
}

.cart ul li .name {
  margin-left: 25px;
}

.cart ul li .price {
  margin-left: 25px;
}

.cart ul li i {
  float: right;
  font-size: 20px;
  margin-top: 65px;
  margin-right: 50px;

}

.cart ul li input {
  margin-right: 50px;
}

</style>