'use strict';

const stripe = require('stripe')('sk_test_51JAN1QK5yB3yxmzndW9Jr5LsjJjEDyZbjDUCEh3OYJCoel3WF56mWgrlI7EEf5PPdQAbZ0W801FLVBezDZPj0A2x00ggPM0jxT' );

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    create:async ctx =>{
        const {name,total,items,stripeTokenId} = ctx.request.body;
        const {id} = ctx.state.user;
        const charge = await stripe.charges.create({
            amount: total * 100,
            currency: "usd",
            description: `Order ${new Date()} by ${ctx.state.user.username}`,
            source: stripeTokenId
        });
        
        const order = await strapi.services.order.create({
            name,
            total,
            items,
            user:id
        });
        return order;
    }
};
