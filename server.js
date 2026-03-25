const express = require('express');
const fetch   = require('node-fetch');
const cors    = require('cors');
const path    = require('path');

const app  = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ── Geocode ciudad ──────────────────────────────
app.get('/api/geocode', async (req, res) => {
  const { address, key } = req.query;
  try {
    const r = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${key}`);
    res.json(await r.json());
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── Autocompletado de ciudades ──────────────────
app.get('/api/autocomplete', async (req, res) => {
  const { input, key } = req.query;
  try {
    const r = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&types=(cities)&key=${key}`
    );
    res.json(await r.json());
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── Buscar lugares cercanos ─────────────────────
app.get('/api/nearbysearch', async (req, res) => {
  const { location, radius, type, key, pagetoken } = req.query;
  let url = pagetoken
    ? `https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${pagetoken}&key=${key}`
    : `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius||10000}&type=${type}&key=${key}`;
  try {
    const r = await fetch(url);
    res.json(await r.json());
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── Detalle de un lugar ─────────────────────────
app.get('/api/placedetail', async (req, res) => {
  const { place_id, key } = req.query;
  try {
    const r = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=website,formatted_phone_number,editorial_summary,reviews&key=${key}`
    );
    res.json(await r.json());
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.listen(PORT, () => {
  console.log('');
  console.log('  ✅  WebProspector v3.0 corriendo en http://localhost:' + PORT);
  console.log('  👉  Abrí esa dirección en tu navegador');
  console.log('');
});
