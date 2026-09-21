/** Chiave e script condivisi fra il banner Bandiera Blu (client) e il layout (server). */
export const BANNER_STORAGE_KEY = "lefarfalle.bandiera-blu-2026.dismissed";

/** Eseguito prima del primo paint: nasconde via CSS il banner già chiuso, senza spostamenti. */
export const BANNER_DISMISS_SCRIPT = `try{if(localStorage.getItem("${BANNER_STORAGE_KEY}"))document.documentElement.classList.add("bb-dismissed")}catch(e){}`;
