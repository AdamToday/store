##in user:
* should be embedded documents:
  * contact info
  * payment info
  * take out cart and orders

##cart: not necessary
* just use order, and add an "in progress" or status to order?

## orders:
* order points to user (1 to 1 relationship; better than a 1 to many, which could get too big over time)

## product: no array of reviews
## have review point to product, author
* tags? categories?

## email and password don't need to be required in our user model
  * validate on front end and in our routes

## user
* address: store as one long string, this is Google's convention:
      `street state city zip coordinates"

