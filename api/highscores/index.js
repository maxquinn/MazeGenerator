import escape from 'sql-template-strings';
import query from '../../src/helpers/db';

export default async (req, res) => {
  const { difficulty, time, name } = req.body;

  const data = await query(escape`
    INSERT INTO highscores (difficulty, time, name)
    VALUES (${difficulty}, ${time}, ${name})
  `);

  return 'error' in data
    ? res.status(400).send(data)
    : res.status(200).send({ difficulty });
};
