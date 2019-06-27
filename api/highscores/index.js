import escape from 'sql-template-strings';
import query from '../../src/helpers/db';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { difficulty, time, name } = req.body;

    const data = await query(escape`
    INSERT INTO highscores (difficulty, time, name)
    VALUES (${difficulty}, ${time}, ${name})
  `);
    return 'error' in data ? res.status(400).send(data) : res.status(200).send({ difficulty });
  }
  const scores = await query(escape`
      SELECT *
      FROM highscores
      WHERE difficulty = ${req.query.difficulty}
      ORDER BY time ASC
      LIMIT 5
    `);
  return res.status(200).json(scores);
};
