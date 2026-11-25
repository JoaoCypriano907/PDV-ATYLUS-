/**
 * PDV ATYLUS — WhatsApp Exclusivo para Contato & Atendimento Oficial
 * WhatsApp: +55 21 97315-8363
 * 
 * Regra: O WhatsApp é utilizado unicamente para contato, suporte e dúvidas comerciais.
 * As compras e downloads ocorrem diretamente no sistema e no checkout da loja.
 */

const WHATSAPP_CONFIG = {
  phoneNumber: '5521973158363',
  displayNumber: '(21) 97315-8363',
  supportMessage: 'Olá! Gostaria de falar com o atendimento/suporte do PDV ATYLUS.'
};

/**
 * Retorna o link oficial do WhatsApp para atendimento
 */
function getWhatsAppContactUrl(customMsg = '') {
  const base = `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}`;
  const text = customMsg || WHATSAPP_CONFIG.supportMessage;
  return `${base}?text=${encodeURIComponent(text)}`;
}

/**
 * Abre o WhatsApp de contato em nova aba
 */
function openWhatsAppContact(customMsg = '') {
  window.open(getWhatsAppContactUrl(customMsg), '_blank', 'noopener,noreferrer');
}

document.addEventListener('DOMContentLoaded', () => {
  // Configura links explícitos de contato para wa.me com target blank
  const waContactLinks = document.querySelectorAll('a[href*="wa.me"]');
  waContactLinks.forEach(link => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });
});
