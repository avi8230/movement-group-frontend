// Utilities
import { defineStore } from 'pinia'
import type ISnackbarOptions from '@/types/ISnackbarOptions';

export const useSnackbarStore = defineStore("snackbar", {
    state: (): { snackbar: ISnackbarOptions } => ({
        snackbar: {
            show: false,
            message: "",
            color: "success",
            timeout: 5000,
            location: "bottom",
            multiLine: false,
            variant: "elevated",
        },
    }),
    actions: {
        hideSnackbar() {
            this.snackbar.show = false;
        },
        showSnackbar(options: ISnackbarOptions) {
            this.snackbar = {
                show: options.show ?? false,
                message: options.message ?? "",
                color: options.color ?? "success",
                timeout: options.timeout ?? 5000,
                location: options.location ?? "top",
            };

            setTimeout(() => {
                this.snackbar.show = false;
            }, this.snackbar.timeout);
        },
    },
});
