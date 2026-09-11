

export const getTextAreaClasses =({ error , disabled }: {error?: string;
  disabled?: boolean; }) =>{

    return `w-full resize-y rounded-sm border border-app-border  px-3 py-2 text-sm text-app-text outline-none transistion-colors duration-150  placeholder:text-app-text-muted
    ${ error ? "border-red-500 focus:border-red-500" : "border-app-border focus:border-app-primary-500" }
    ${ disabled ? "cursor-not-allowed bg-app-bg opacity-60" : ""}`
}