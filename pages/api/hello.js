/*
Next.js API route support: https://nextjs.org/docs/api-routes/introduction
  So darn nifty!
*/
export default (req, res) => {
  res.statusCode = 200
  res.json({ name: 'John Doe' })
}
