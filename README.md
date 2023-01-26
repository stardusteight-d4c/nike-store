# Nike Store | Clean Architecture, Stripe API & Redux

![banner](banner.png)

> Project developed with the aim of practicing the `integration of a payments API` with the application, in addition to `processing
> payment via backend to improve application security`. Product data such as pricing, images, and inventory information is
> stored, but can also be managed on the `Hygraph Headless CMS platform`. So the flow of this application is to register a consumer with
> an address associated with it, it can see the available products and buy as many as it wants (as long as it does not exceed the stock limit),
> when proceeding to `checkout`, the consumer must confirm the shipping address of the purchase, and request the checkout session, in which the data
> are processed by the backend, finally after successfully completing the purchase, a valid session is created containing the purchase information and by
> order are added to a database, where we use the Hygraph product id to identify the product, it is sent as `metadata`, for the `Stripe API`.

:arrow_right: GraphQL and Hygraph <br /> 
:arrow_right: Stripe API <br /> 
:arrow_right: Clean Architecture <br /> 
:arrow_right: Absolute imports <br />
:arrow_right: TailwindCSS - Styling Functions in the Style Object <br />
