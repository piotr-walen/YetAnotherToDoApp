declare module 'middleware' {
    export function loginRequired(): void;
    export function ensureCorrectUser(): void;
}
