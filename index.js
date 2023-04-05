/*
  Int Fract
  https://github.com/intfract
  Please leave this comment as attribution!
*/

import { render } from 'inflict'
import express from 'express'
import fetch from 'node-fetch'
import bodyParser from 'body-parser'
import fs from 'fs'

import * as dotenv from 'dotenv'
dotenv.config()

const app = express()

const port = process.env.PORT || 3000

app.use(express.static('public'))
app.use(bodyParser.json())

app.get('/', async (req, res) => {
  const { params } = req
  res.send(render('views', '', { title: 'IGCSE', path: '' })) 
})

app.get('/content', (req, res) => {
  res.send(render('views', 'content.html', {}))
})

app.get('/courses/:subject', (req, res) => {
  res.send(render(`views/courses/${req.params.subject}`, '', { title: `IGCSE ${req.params.subject.replace('_', ' ').toUpperCase()}`, path: '../../', relative: `courses/${req.params.subject}` }))
})

app.get('/content/:subject', (req, res) => {
  res.send(render(`views/courses/${req.params.subject}`, 'content.html', { relative: `courses/${req.params.subject}` }))
})

app.get('/courses/:subject/:topic', (req, res) => {
  res.send(render(`views/courses/${req.params.subject}/${req.params.topic}`, '', { title: `${req.params.topic.replace('_', ' ').toUpperCase()}`, path: '../../', relative: `courses/${req.params.subject}` }))
})

app.listen(port)