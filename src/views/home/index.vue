<template>
  <div>
    <el-container style="height: auto; border: 1px solid #eee; with: 100%">
      <el-aside width="auto">
        <el-button type="info" icon="el-icon-s-grid" circle class="open-nav-btn" @click="handleNavBtnClick"></el-button>
            <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span slot="title">TODO</span>
                </template>
                <el-menu-item-group>
                  <span slot="title">分组一</span>
                  <el-menu-item index="1-1">选项1</el-menu-item>
                  <el-menu-item index="1-2">选项2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组2">
                  <el-menu-item index="1-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="1-4">
                  <span slot="title">选项4</span>
                  <el-menu-item index="1-4-1">选项1</el-menu-item>
                </el-submenu>
              </el-submenu>
              <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
              </el-menu-item>
              <el-menu-item index="3" disabled>
                <i class="el-icon-document"></i>
                <span slot="title">导航三</span>
              </el-menu-item>
              <el-menu-item index="4">
                <i class="el-icon-setting"></i>
                <span slot="title">导航四</span>
              </el-menu-item>
            </el-menu>
      </el-aside>
      <el-container>
        <todo/>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Todo from '@/components/Todo.vue'
import './index.scss'

export default Vue.extend({
    name: 'Home',
    components: {
      Todo
    },
    data() {
      return {
        isCollapse: true
      };
    },
    methods: {
      handleNavBtnClick (e: any) {
        this.isCollapse = !this.isCollapse
      },
      handleOpen(key: string, keyPath: string) {
        console.log(key, keyPath);
      },
      handleClose(key: string, keyPath: string) {
        console.log(key, keyPath);
      }
    }
})

</script>