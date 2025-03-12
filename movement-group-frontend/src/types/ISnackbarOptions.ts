export default interface ISnackbarOptions {
    message: string;
    color?: string;
    timeout?: number;
    location?: "top" | "bottom" | "left" | "right";
    multiLine?: boolean;
    variant?: "elevated" | "flat" | "text" | "tonal" | "outlined" | "plain";
    show: boolean;
}