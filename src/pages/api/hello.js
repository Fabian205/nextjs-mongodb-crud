// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// all into api is backend
// all out to api is the frontend
export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}
