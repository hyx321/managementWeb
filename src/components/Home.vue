<template>
    <div>
        <el-header style="font-size: 12px">
           <span>XXXx系统</span>
              <div>
                <el-dropdown>
                    <i class="el-icon-setting" >1231</i>
                    <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>查看</el-dropdown-item>
                    <el-dropdown-item>新增</el-dropdown-item>
                    <el-dropdown-item>删除</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <span>王小虎</span>
              </div>
        </el-header>
        <el-container style="height: 100%; border: 1px solid #eee">
            <el-aside  :width="isCollapse ? '64px' : '200px'"  style="background-color: rgb(238, 241, 246)">
              <div class="toggle-button" @click="togleCollapse">|||</div>
              <el-menu class="el-menu-class" :unique-opened="true" :collapse="isCollapse"
                  :collapse-transition="false" :router="true" :default-active="$router.path">
                <el-submenu :index="item.id + ''" v-for="item in items" :key="item.id">
                  <template slot="title">
                    <i :class="icons[item.id]"></i>
                    <span slot="title">{{item.name}}</span>
                  </template>
                    <el-menu-item-group v-for="su in item.menuBaseList" :key="su.id">
                      <el-menu-item :index="su.id + ''">
                        <i class="el-icon-menu"></i>{{su.name}}
                      </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
              </el-menu>
            </el-aside>

            <el-container>
                <el-main>
                  <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
  data () {
    return {
      items: [],
      icons: {
        101: 'el-icon-suitcase',
        102: 'el-icon-document',
        103: 'el-icon-user-solid',
        125: 'el-icon-user',
        145: 'el-icon-postcard'
      },
      isCollapse: false
    }
  },
  created () {
    this.getData()
  },
  methods: {
    async getData () {
      const result = await this.$ajax.get('menu/getMenuList', {
        headers: {
          jwt: window.sessionStorage.getItem('token')
        }
      })
      if (result.data.code !== 200) {
        return this.$mess.error(result.data.message)
      }
      this.items = result.data.data
    },
    togleCollapse () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style lang="less" scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
    display: flex;
    justify-content: space-between;

  }
  .el-dropdown {
    margin-right: 0%;
  }

  .el-aside {
    color: #333;
    height: 100%;
  }
  .toggle-button {
    font-size: 15px;
    padding: 2px;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
  .el-menu-class{
    height: 100%;
  }
</style>
