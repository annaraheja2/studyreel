// Master / owner accounts — the only ones allowed to edit and upload content.
// To add or remove an owner, edit this list.
export const ADMIN_EMAILS = [
  'annaraheja2@gmail.com',
  'alexlevyalp@gmail.com',
  'f.nguyen088@gmail.com',
].map((e) => e.toLowerCase())

export function isAdminEmail(email: string | null | undefined): boolean {
  return !!email && ADMIN_EMAILS.includes(email.toLowerCase())
}
