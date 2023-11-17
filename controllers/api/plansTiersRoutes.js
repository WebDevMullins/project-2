const router = require('express').Router()
const { MembershipTier, MembershipPlan, Trainer, User } = require('../../models')

router.get('/tiers', async (req, res) => {
	try {
		const tierData = await MembershipTier.findAll({
			include: [
				{
					model: Trainer
				}
			]
		})
		const tier = tierData.map((tier) => tier.get({ plain: true }))
		res.render('tier', { tier })
		// res.status(200).json(tierData);
	} catch (err) {
		res.status(400).json(err)
	}
})

router.get('/plans', async (req, res) => {
	try {
		const planData = await MembershipPlan.findAll()
		res.status(200).json(planData)
	} catch (err) {
		res.status(400).json(err)
	}
})

router.get('/', async (req, res) => {
	try {
		// Get all membership plans
		const planData = await MembershipPlan.findAll({
			attributes: ['id', 'name', 'duration']
		})
		// Get all tiers
		const tierData = await MembershipTier.findAll({
			attributes: ['id', 'name']
		})

		// Serialize data
		const plan = planData.map((plan) => plan.get({ plain: true }))

		const tier = tierData.map((tier) => tier.get({ plain: true }))
		// Render template with membership data
		res.render('membership', { plan, tier })
		// res.json(membership)
	} catch (err) {
		// Handle server error
		res.status(500).json(err)
	}
})

module.exports = router
