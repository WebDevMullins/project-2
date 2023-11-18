const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class Member extends Model {}

Member.init(
	{
		// id: {
		// 	type: DataTypes.INTEGER,
		// 	allowNull: false,
		// 	autoIncrement: true
		// },
		f_name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [2, 30]
			}
		},
		l_name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [2, 30]
			}
		},
		join_date: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				is: /^\d{3}-\d{3}-\d{4}$/i
			}
		},
		dob: {
			type: DataTypes.STRING,
			allowNull: false
		},
		address: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [2, 30]
			}
		},
		city: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [2, 30]
			}
		},
		state: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [2, 30]
			}
		},
		email: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
			references: {
				model: 'user',
				key: 'email'
			}
		},
		membershipStaus: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: 0
		},
		plan_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			reference: {
				model: 'membership_plan',
				key: 'id'
			}
		},
		tier_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'membership_tier',
				key: 'id'
			}
		}
	},
	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: 'member'
	}
)

module.exports = Member
