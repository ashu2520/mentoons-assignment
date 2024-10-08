const db = require("../config/database");

async function uploadComic(req, res) {
  try {
    console.log('Uploaded file:', req.file);
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    if (req.file.mimetype !== 'application/pdf') {
      return res.status(400).send('Only PDF files are allowed.');
    }

    console.log('Uploaded file:', req.file);

    const comicUrl = `uploads/${req.file.filename}`;

    const comicName = req.file.originalname;
    const createdAt = new Date(); 

    const query = `INSERT INTO comic_lists (comic_name, comic_url, created_at) VALUES (?, ?, ?)`;
    await db.query(query, [comicName, comicUrl, createdAt]);

    res.status(200).json({
      message: 'Comic uploaded successfully!',
      file: req.file, 
      comicUrl: comicUrl
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = uploadComic;
