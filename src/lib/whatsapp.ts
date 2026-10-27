/**
 * Central WhatsApp + shop contact configuration for Nas Tech.
 * Every "Order / Enquire on WhatsApp" action in the app builds its
 * message through `buildWhatsAppMessage` so the format stays consistent.
 */

export const SHOP_WHATSAPP = '233551659683';
export const SHOP_PHONE_DISPLAY = '+233 55 165 9683';
export const SHOP_PHONE_TEL = '+233551659683';
export const SHOP_ADDRESS_SHORT = 'Sawaba, Kumasi';
export const SHOP_ADDRESS = 'Sawaba, near St. Patrick Hotel, Kumasi';
export const SHOP_ADDRESS_FULL = 'Sawaba, near St. Patrick Hotel, Kumasi, Ashanti Region, Ghana';

/** Generic link (no time-based greeting, safe for server rendering). */
export const SHOP_WHATSAPP_LINK = `https://wa.me/${SHOP_WHATSAPP}?text=${encodeURIComponent('Hello Nas Tech! I would like to make an enquiry.')}`;

export function whatsappUrl(text?: string) {
  return text
    ? `https://wa.me/${SHOP_WHATSAPP}?text=${encodeURIComponent(text)}`
    : `https://wa.me/${SHOP_WHATSAPP}`;
}

/** "Good morning" / "Good afternoon" / "Good evening" based on the customer's local time. */
export function timeGreeting(date: Date = new Date()) {
  const h = date.getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export type Fulfillment = 'pickup' | 'delivery';

export interface WhatsAppLine {
  label: string;
  quantity?: number;
  /** Line total in GH₵ (already multiplied by quantity). */
  amountGHS?: number;
  details?: string[];
}

export interface WhatsAppOrder {
  /** What the customer wants, e.g. "order the following items" or "book a repair". */
  intent: string;
  lines?: WhatsAppLine[];
  totalGHS?: number;
  note?: string;
}

export interface CustomerDetails {
  name: string;
  location: string;
  fulfillment: Fulfillment;
}

export const formatCedis = (amount: number) =>
  `GH₵ ${new Intl.NumberFormat('en-GH', { maximumFractionDigits: 2 }).format(amount)}`;

export function buildWhatsAppMessage(order: WhatsAppOrder, customer: CustomerDetails, now: Date = new Date()) {
  const name = customer.name.trim();
  const location = customer.location.trim();
  const parts: string[] = [];

  parts.push(`Hi, ${timeGreeting(now).toLowerCase()} Nas Tech! 👋`);
  parts.push(`${name ? `My name is *${name}*` : 'Hello'}${location ? ` and I'm in *${location}*` : ''}.`);
  parts.push(`I want to ${order.intent}:`);

  if (order.lines && order.lines.length > 0) {
    parts.push('');
    order.lines.forEach((line, i) => {
      const qty = line.quantity && line.quantity > 1 ? ` (x${line.quantity})` : '';
      const amount = typeof line.amountGHS === 'number' ? ` — ${formatCedis(line.amountGHS)}` : '';
      parts.push(`${i + 1}. *${line.label}*${qty}${amount}`);
      line.details?.forEach((d) => parts.push(`    • ${d}`));
    });
  }

  if (typeof order.totalGHS === 'number') {
    parts.push('');
    parts.push(`*TOTAL: ${formatCedis(order.totalGHS)}*`);
  }

  parts.push('');
  parts.push(
    customer.fulfillment === 'delivery'
      ? `🚚 I'd like it *delivered*${location ? ` to ${location}` : ''}.`
      : `🏪 I'll *pick up in-shop* (${SHOP_ADDRESS}).`
  );
  if (order.note) parts.push(order.note);
  parts.push('');
  parts.push('Please confirm availability and next steps. Thank you!');

  return parts.join('\n');
}

const STORAGE_KEY = 'nas_tech_customer';

export function loadCustomer(): CustomerDetails {
  if (typeof window === 'undefined') return { name: '', location: '', fulfillment: 'pickup' };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        name: parsed.name || '',
        location: parsed.location || '',
        fulfillment: parsed.fulfillment === 'delivery' ? 'delivery' : 'pickup',
      };
    }
  } catch {
    /* ignore */
  }
  return { name: '', location: '', fulfillment: 'pickup' };
}

export function saveCustomer(details: CustomerDetails) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(details));
  } catch {
    /* ignore */
  }
}
