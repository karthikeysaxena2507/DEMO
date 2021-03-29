### Website Features:

* I built a website where different restaurant owners can easily manage their billing operations, menu and also compare them with other restaurants. 
* Customers can easily browse different restaurants, see their menu on the site, compare and also estimate the bill beforehand.

### [LIVE VERSION](https://resturant-finder.herokuapp.com/)

<hr>

### Authentication Features:
* Users must login themselves to add their restaurant to the site using their Email.
* The password is stored in database in a hashed format using BcryptJs.
* For Authorization, Token Based Authentication has been added using JSON Web Token (JWT) with RSA cryptographic algorithm.
* The authenticated APIs and routes are protected and can be accessed only if user has a token assigned to him on successful login.
* User remains logged in till the refresh token expires or the user logs out himself. The refresh token is used to generate the access token after short periods of time which is infact used for authorization.

<hr>

### Technologies Used: 

#### FRONTEND
* The FrontEnd is built using **Reactjs, CSS/Bootstrap, HTML and Hooks API** for state management in React.
* **Axios** Library for API integration and making requests to backend.

#### BACKEND
* The Backend is built using **Nodejs** with **Express** framework.
* For database, **ClearDB** cloud service for **MySQL** is used for storing data and querying is done via **Sequelize** ORM.
* **Redis** for mapping access and refresh tokens, used for authentication and authorization.
* **Cloudinary API** for uploading and storing images on the cloud.
* The Website is deployed on **Heroku**.

<hr>

### Other Features:
* Comprehensive Error Handling has been added for different functions and APIs.
* Code is fully modularized and refactored, all the buisness logic part is separated from the APIs, middlewares, models etc.

<hr>

SNAPSHOTS:
![pic1](https://user-images.githubusercontent.com/66271249/112763103-ba119600-9020-11eb-8d8d-294edab18972.PNG)
![pic2](https://user-images.githubusercontent.com/66271249/112763104-ba119600-9020-11eb-9d7f-114d68e13b4b.PNG)
![pic3](https://user-images.githubusercontent.com/66271249/112763106-baaa2c80-9020-11eb-953d-ef54f0aee056.PNG)
![pic4](https://user-images.githubusercontent.com/66271249/112763107-bb42c300-9020-11eb-8ee9-9d1905e5393d.PNG)
![pic5](https://user-images.githubusercontent.com/66271249/112763108-bb42c300-9020-11eb-82ea-f8379bbd8814.PNG)
![pic6](https://user-images.githubusercontent.com/66271249/112763111-bbdb5980-9020-11eb-8bf6-f7632029a5c0.PNG)
![pic7](https://user-images.githubusercontent.com/66271249/112763112-bc73f000-9020-11eb-94dc-1449215fc79b.PNG)
![pic8](https://user-images.githubusercontent.com/66271249/112763114-bd0c8680-9020-11eb-8094-626bb782e657.PNG)
![pic9](https://user-images.githubusercontent.com/66271249/112763100-b8e06900-9020-11eb-8191-805b0c99a083.PNG)
![pic10](https://user-images.githubusercontent.com/66271249/112763116-bd0c8680-9020-11eb-8418-f8a136112072.PNG)

<hr>
