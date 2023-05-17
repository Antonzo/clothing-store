const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const BasketClothingItem = sequelize.define('basket_clothing_item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const ClothingItem = sequelize.define('clothing_item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
})

const SubCategory = sequelize.define('subcategory', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const ClothingItemInfo = sequelize.define('clothing_item_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

const Discount = sequelize.define('discount', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    user_id: {type: DataTypes.INTEGER, allowNull: false},
    clothing_item_id: {type: DataTypes.INTEGER, allowNull: false},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    percent: {type: DataTypes.INTEGER, allowNull: false},
})

const UserDiscount = sequelize.define('user_discount', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const DiscountClothingItem = sequelize.define('discount_clothing_item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

User.hasOne(Basket)
Basket.belongsTo(User)

// foreignKeys will be added automatically
User.belongsToMany(Discount, {through: UserDiscount})
Discount.belongsToMany(User, {through: UserDiscount})

// foreignKeys will be added automatically
Discount.belongsToMany(ClothingItem, {through: DiscountClothingItem})
ClothingItem.belongsToMany(Discount, {through: DiscountClothingItem})

ClothingItem.hasMany(ClothingItemInfo)
ClothingItemInfo.belongsTo(ClothingItem)

Category.hasMany(SubCategory)
SubCategory.belongsTo(Category)

SubCategory.hasMany(ClothingItem)
ClothingItem.belongsTo(SubCategory)

Brand.hasMany(ClothingItem)
ClothingItem.belongsTo(Brand)

ClothingItem.hasMany(BasketClothingItem)
BasketClothingItem.belongsTo(ClothingItem)

// foreignKeys will be added automatically
Basket.belongsToMany(ClothingItem, {through: BasketClothingItem})
ClothingItem.belongsToMany(Basket, {through: BasketClothingItem})

module.exports = {
    User,
    Basket,
    BasketClothingItem,
    ClothingItem,
    SubCategory,
    Category,
    Brand,
    ClothingItemInfo,
    Discount,
    UserDiscount,
    DiscountClothingItem
}

