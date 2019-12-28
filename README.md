# 1. Setup
react & node

Clone the project : git clone https://github.com/ABLAA/ATS.git
an run npm install .

# 2. Database server

SQL data base
Using phpmyadmin

Make sure to update database connection path in the file atsServer/server.js

# 3. Run the project
To run this starter project: 

node server in atsServer/server.js
npm start in ats
 # 4. About app
 I-  Backend :
 
1- Récuperer des produits depuis l'url suivant : http://test.ats-digital.com:3000/products?size=500 et les insérer dans la base de donnée
2- Créer une API: GET /api/products dans laquelle vous exposez ces produits là depuis la base de données

 II- Frontend :
 
1- Page List dans laquelle j'affiche la liste des produits : productName, category, basePrice, la moyenne arithmétique des ratings (Filtre || Pagination)

2- Un click sur un produit me renvoie vers une page détaillée de ce produit dans laquelle je trouve toutes ses informations
