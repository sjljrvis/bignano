
var CronSchema = module.exports = {
	title: String,
	url: String,
	source: String,
	date: {
		type: Date,
		default: Date.now()
	},
	campaignId: String,
	status: {
		type: Boolean,
		default: false
	},
	totalLeads: {
		type: Number,
		default: 0
	},
	country: String

};