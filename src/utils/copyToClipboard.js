// utils/copyToClipboard.js
// Copia un texto al portapapeles y ejecuta un callback opcional (solo API moderna)

export function copyToClipboard(text, onCopied) {
  navigator.clipboard.writeText(text).then(() => {
    if (onCopied) onCopied(text)
  })
}
