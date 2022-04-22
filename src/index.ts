import express from 'express'
import path from 'path'

const app = express()

const server = app.listen(5000)

app.use(express.static(path.resolve(__dirname, '../views/build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/build', 'index.html'));
});