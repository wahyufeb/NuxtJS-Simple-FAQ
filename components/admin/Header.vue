<template>
  <header>
    <h5>Selamat Datang {{ username }}</h5>
    <ul>
      <li>Tambah FAQ</li>
      <li>
        <a href="/admin/faq-user">
          Daftar Pertanyaan User
        </a>
      </li>
    </ul>
  </header>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    username: { type: String }
  }
};
</script>

<style>
header {
  background-color: burlywood;
  padding: 10px 50px;
  color: #fff;
  display: flex;
  justify-content: space-between;
}

header ul {
  list-style-type: none;
}
header ul li {
  display: inline-block;
  margin-right: 20px;
}
header ul li:hover {
  cursor: pointer;
}
header ul li a {
  text-decoration: none;
  color: #fff;
}

header ul li a:hover {
  color: #fff;
  opacity: 0.8;
}
</style>
