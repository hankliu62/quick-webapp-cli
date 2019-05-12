<template functional>
  <a-sub-menu :key="data.key" v-on="listeners">
    <span slot="title">
      <a-icon v-if="data.attrs.menu.meta && data.attrs.menu.meta.icon" :type="data.attrs.menu.meta.icon" />
      <span
        v-if="data.attrs.parentpath"
        v-text="data.attrs.i18n(`${data.attrs.parentpath}/${data.attrs.menu.path}`)"
      />
      <span v-else v-text="data.attrs.i18n(data.attrs.menu.path)" />
    </span>
    <template v-for="item in data.attrs.menu.children">
      <a-menu-item
        v-if="!item.children"
        :key="data.attrs.parentpath ? `${data.attrs.parentpath}/${data.key}/${item.path}` : `${data.key}/${item.path}`"
      >
        <router-link
          :to="data.attrs.parentpath ? `${data.attrs.parentpath}/${data.key}/${item.path}` : `${data.key}/${item.path}`"
        >
          <a-icon v-if="item.meta && item.meta.icon" :type="item.meta.icon" />
          <span
            v-if="data.attrs.parentpath"
            v-text="data.attrs.i18n(`${data.attrs.parentpath}/${data.attrs.menu.path}/${item.path}`)"
          />
          <span v-else v-text="data.attrs.i18n(`${data.attrs.menu.path}/${item.path}`)" />
        </router-link>
      </a-menu-item>
      <sider-sub-menu
        v-else
        :key="data.attrs.parentpath ? `${data.attrs.parentpath}/${data.key}/${item.path}` : `${data.key}/${item.path}`"
        :menu="item"
        :parentpath="data.attrs.parentpath ? `${data.attrs.parentpath}/${data.attrs.menu.path}` : data.attrs.menu.path"
      />
    </template>
  </a-sub-menu>
</template>
