const database = require('../data');

exports.postChat = async (req, res) => {
  try {
    const values = [
      req.body.ai_data,
      req.body.ai_media,
      req.body.ai_lang,
      req.body.ai_image,
      req.body.package_name,
      req.body.package_desc,
    ];
    await data.query(
      'INSERT INTO packages(ai_data,ai_media,ai_lang,ai_image,package_name,package_desc) values($1,$2,$3,$4,$5,$6)',

      values
    );

    return res.status(201).json({ message: 'C post successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};