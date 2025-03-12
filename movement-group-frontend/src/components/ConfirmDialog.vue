<template>
  <v-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    :width="width"
    persistent
  >
    <v-card>
      <v-card-title class="text-h5 pa-4">
        {{ title }}
      </v-card-title>

      <v-card-text class="pa-4 text-body-1">
        {{ message }}
      </v-card-text>

      <v-card-actions class="pa-4">
        <v-spacer />
        <v-btn variant="tonal" @click="onCancel">
          {{ cancelText }}
        </v-btn>
        <v-btn :color="confirmColor" @click="onConfirm">
          {{ confirmText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template> 

<script setup lang="ts">
interface Props {
  modelValue: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: string;
  width?: number | string;
}

const props = withDefaults(defineProps<Props>(), {
  title: "Confirm Action",
  confirmText: "Confirm",
  cancelText: "Cancel",
  confirmColor: "error",
  width: 400,
});

const emit = defineEmits(["update:modelValue", "confirm", "cancel"]);

const onConfirm = () => {
  emit("confirm");
  emit("update:modelValue", false);
};

const onCancel = () => {
  emit("cancel");
  emit("update:modelValue", false);
};
</script>
