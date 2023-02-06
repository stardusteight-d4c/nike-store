# Security Factors for E-Commerce and Product Sales on the Web:

1. `NEVER` store product information or process the purchase on your front-end.

 - If you want to cache the product data through localStorage for example, it's possible, but before purchasing `all product information as well as the price must be stored in the backend of the application`, i.e. , you can send a request with the `ID` of the product and its `QUANTITY` and then the `BACKEND WILL BE RESPONSIBLE FOR ACQUIRING THE PRODUCT INFORMATION AND PROCESSING THE PURCHASE (the front end cannot be an intermediary and send sensitive product data (such as PRICE) to the back-end, the front-end is just an interface).`

 - The mocked data is only used for the development of the application interface, it should never be used in a real application static files in the front-end.

2. `ALWAYS` update stock information after a purchase, and before proceeding with any purchase, check that stock is still available. Also `NEVER` allow any user to buy more than is in stock.

 - With this we have a better management of purchases made in e-commerce. We have to be careful with the stock, because if 3 people are making the same purchase simultaneously, and that product has only 1 item in stock, the three purchases can be made. However, this is already a concern for more scalable applications, and large e-commerces that serve a larger audience. In the best case, before proceeding with any checkout, check the availability of the product `(this applies more to physical and limited products)`.

 3. `ALWAYS` monitor the sales flow and `purchase STATUS`.

- We don't want to ship the same purchase order more than once, do we? The e-commerce system must contain all purchase information in some database, list purchases by pagination, be able to filter and remove the necessary metrics for data analysis, basically the system must contain all purchase ENTRIES and all PRODUCT OUTLETS, `where we can monitor sales`.

*<i>Since the purpose of this application is to be just a project, I will not implement all three aspects in their entirety, however when developing a real and functional E-Commerce (which is not an easy task to do this whole system alone), `we have to consider how to develop these three topics in a successful way`, and also develop user profiles, so that they can monitor the status of their recent purchases made on the site, and many other variables to take into account, both for those who buy and for the seller, that is, creating true e-commerces is not just integrating payment APIs and having product information in your back-end, it goes far beyond just endpoints.</i>
