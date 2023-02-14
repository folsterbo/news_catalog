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
                <news-modal-delete class="news-modal-delete"
                    @modal-close-btn-clicked="$emit('modal-close-btn-clicked')"
                    @modal-delete-btn-clicked="modalDeleteRecordSuccessHandler"
                    v-if="isDeleteMode"
                    :id="id"
                    :modalMaskClick="modalMaskClick"
                ></news-modal-delete>
            </div>
        </div>
    </transition>
</template>

<script>

import NewsModalView from './Modals/NewsModalView'
import NewsModalDelete from './Modals/NewsModalDelete'

export default {
    name: 'NewsModalSet',
    components: { NewsModalView, NewsModalDelete },
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
        isDeleteMode: function () {
            return 'delete' === this.mode
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
        },
        setDeleteMode() {
            this.modalMode = 'delete'
        },
        modalDeleteRecordSuccessHandler() {
            this.$emit('modal-close-btn-clicked');
            this.$emit('data-changes');
        },
    },
}

</script>

<style lang="scss">
</style>
