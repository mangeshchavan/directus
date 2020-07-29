import express from 'express';
import asyncHandler from 'express-async-handler';
import sanitizeQuery from '../middleware/sanitize-query';
import useCollection from '../middleware/use-collection';
import RelationsService from '../services/relations';

const router = express.Router();

router.use(useCollection('directus_relations'));

router.post(
	'/',
	sanitizeQuery,
	asyncHandler(async (req, res) => {
		const service = new RelationsService({ accountability: req.accountability });
		const primaryKey = await service.create(req.body);
		const item = await service.readByKey(primaryKey, req.sanitizedQuery);
		return res.json({ data: item || null });
	})
);

router.get(
	'/',
	sanitizeQuery,
	asyncHandler(async (req, res) => {
		const service = new RelationsService({ accountability: req.accountability });
		const records = await service.readByQuery(req.sanitizedQuery);
		return res.json({ data: records || null });
	})
);

router.get(
	'/:pk',
	sanitizeQuery,
	asyncHandler(async (req, res) => {
		const service = new RelationsService({ accountability: req.accountability });
		const record = await service.readByKey(req.params.pk, req.sanitizedQuery);
		return res.json({ data: record || null });
	})
);

router.patch(
	'/:pk',
	sanitizeQuery,
	asyncHandler(async (req, res) => {
		const service = new RelationsService({ accountability: req.accountability });
		const primaryKey = await service.update(req.body, req.params.pk);
		const item = await service.readByKey(primaryKey, req.sanitizedQuery);
		return res.json({ data: item || null });
	})
);

router.delete(
	'/:pk',
	asyncHandler(async (req, res) => {
		const service = new RelationsService({ accountability: req.accountability });
		await service.delete(Number(req.params.pk));

		return res.status(200).end();
	})
);

export default router;