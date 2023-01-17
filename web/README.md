# Security Factors for E-Commerce and Product Sales on the Web:

1. `NEVER` store product information on your fron-end.

 - If you want to cache product data through localStorage, for example, it is possible, but before purchasing `all product information, as well as the price, must be acquired through the application's back-end`, that is, you can send a request with the ID of the product and thus proceed with the purchase after obtaining the data from the back-end.

 - The mocked data is only used for the development of the application interface, it should never be used in a real application static files in the front-end.

2. `ALWAYS` update stock information after a purchase, and before proceeding with any purchase, check that stock is still available. Also `NEVER` allow any user to buy more than is in stock.

 - With this we have a better management of purchases made in e-commerce. We have to be careful with the stock, because if 3 people are making the same purchase simultaneously, and that product has only 1 item in stock, the three purchases can be made. However, this is already a concern for more scalable applications, and large e-commerces that serve a larger audience. In the best case, before proceeding with any checkout, check the availability of the product `(this applies more to physical and limited products)`.

 3. `ALWAYS` have an order STATUS, whether the order has already been shipped or not, to monitor sales.

- We don't want to send the same request more than once, do we? The e-commerce system must have all purchase information in some database, list purchases by pagination, be able to filter and remove the necessary metrics for data analysis, basically the system must contain all purchase INPUT and all OUTPUT of products, `where we can monitor sales`.

*<i>Since the purpose of this application is to be just a project, I will not implement all three aspects in their entirety, however when developing a real and functional E-Commerce (which is not an easy task to do this whole system alone), `we have to consider how to develop these three topics in a successful way`, and also develop user profiles, so that they can monitor the status of their recent purchases made on the site, and many other variables to take into account, both for those who buy and for the seller, that is, creating true e-commerces is not just integrating payment APIs and having product information in your back-end, it goes far beyond just endpoints.</i>