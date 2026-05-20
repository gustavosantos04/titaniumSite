export const siteName = import.meta.env.VITE_APP_NAME || 'Titanium Agency Legacy'
export const siteUrl = import.meta.env.VITE_APP_URL || 'https://titaniumagencylegacy.com.br'
export const whatsapp = import.meta.env.VITE_WHATSAPP || '5551995988984'
export const instagramUrl = 'https://www.instagram.com/titaniumagencylegacy/'
export const contactEmail = 'titaniumaglegacy@gmail.com'

export function buildWhatsappLink(text = '') {
  const normalized = text ? `?text=${encodeURIComponent(text)}` : ''
  return `https://wa.me/${whatsapp}${normalized}`
}
