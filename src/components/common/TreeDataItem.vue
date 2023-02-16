<template>
    <li :class="['tree-data-item', isSelectedItem(item) && 'selected']">
        <div
            class="item-name"
            :class="{bold: hasChild}"
            @click="itemClickEvent(item)"
        >
            <i
                class="mdi mdi-folder-outline"
                v-if="hasChild"
            ></i>
            <i
                class="mdi mdi-circle-small"
                v-else
            ></i>
            <div class="item-name">{{ item[this.itemsObject.parentKey] }}</div>
            
            <div
                class="mdi mdi-chevron-right"
                v-if="hasChild"
                :class="{'item-open': isOpen}"
                @click="toggle"
            >
            </div>


        </div>
        <ul class="tree-data-main" v-show="isOpen" v-if="hasChild">
            <tree-data-item
                v-for="(item, index) in item[this.itemsObject.recursionKey]"
                :item="item"
                :key="index"
                :last-clicked-item-id="lastClickedItemId"
                :items-object="itemsObject"
                @item-clicked="itemClickHandler"
                @change-event="transmit"
                @dropdown-btn-clicked="$emit('dropdown-btn-clicked', $event)"
            ></tree-data-item>
        </ul>
    </li>
</template>

<script>

import TreeDataItem from '../common/TreeDataItem.vue'
export default {
    name: 'TreeDataItem',
    components: { TreeDataItem },
    props: {
        idFieldName: {
            type: String,
            default: 'id',
        },
        item: {

        },
        itemsObject: {
            type: Object,
            required: true,
        },
        lastClickedItemId: {
            type: Number,
        },
    },
    data() {
        return {
            isOpen: false,
            isDropDownOpen: false,
        };
    },
    computed: {
        hasChild: function () {
            return this.item[this.itemsObject.recursionKey];
        },
    },
    methods: {
        transmit(event, item) {
            this.$emit('change-event', event, item)
        },
        itemClickEvent(item) {
            item.path = '/' + this.item.id
            this.$emit('item-clicked', item);
        },
        itemClickHandler(item) {
            item.path = '/' + this.item.id + item.path
            this.$emit('item-clicked', item)
        },
        toggle() {
            this.isOpen = !this.isOpen
        },
        isSelectedItem(item) {
            return item[this.idFieldName] === this.lastClickedItemId;
        },
    },
}

</script>

<style scoped lang="scss">
.item-name {
    display: flex;
    align-items: center;
    padding: 6px 12px;
    cursor: pointer;
}
.item-name.bold {
    font-weight: bold;
}
.item-name:hover {
    background-color: #f6f2fc;
    border-radius: 12px;
}
.item-open {
    transform-origin: center center;
    transform: rotate(90deg);
    transition: all 0.5s cubic-bezier(0.25, 1.7, 0.35, 0.8);
    top: -3px;
}
.mdi {
    width: 24px;
    height: 24px;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>
