<template>
    <transition
        name="modal"
        v-if="isModalVisible"
    >
        <div class="modal-mask" @mousedown="modalMaskClick++">
            <div class="modal-wrapper" @mousedown.stop="">
                <news-modal-view class="news-modal-view"
                    @modal-close-btn-clicked="$emit('modal-close-btn-clicked')"
                    v-if="isViewMode"
                    :id="id"
                    :modalMaskClick="modalMaskClick"
                ></news-modal-view>
            </div>
        </div>
    </transition>
</template>

<script>

import NewsModalView from './Modals/NewsModalView'

export default {
    name: 'NewsModalSet',
    components: { NewsModalView },
    props: {
        isModalVisible: {
            type: Boolean,
            required: true,
        },
        mode: {
            type: String,
            required: true,
        },
        id: {
            type: Number,
            required: true,
        },
    },
    data: function () {
        return {
            modalMode: this.mode,
            modalMaskClick: 0,
        }
    },
    computed: {
        isViewMode: function () {
            return 'view' === this.mode
        },
    },
    watch: {
        isModalVisible: function () {
            if (!this.isModalVisible) {
                this.setViewMode();
            }
        },
    },
    methods: {
        setViewMode() {
            this.modalMode = 'view'
            this.$emit('update:mode', 'view')
        },
    },
}

</script>

<style lang="scss">
</style>
