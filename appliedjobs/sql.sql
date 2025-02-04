SELECT
  "companyName",
  "externalUrl",
  "description"
FROM
  jobs
WHERE
  status = 'applied'


UPDATE jobs
SET "status" = 'downloaded'
WHERE "status" = 'applied'
  AND 'Submitted' = ANY("labels");  



===================


UPDATE jobs
SET
  "status" = 'deleted'
WHERE
  "location" LIKE 'United States'
  OR (
    "title" NOT ILIKE '%Android%'
    AND "description" NOT ILIKE '%Android%'
  );
